import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "@/store";
import { useLazyAuthMeQuery } from "@/services/auth/auth-api";
import { authActions } from "@/slices/auth/reducer";
import { getExpirationTime, isValidToken } from "@/utils/auth";
import { SplashScreen } from "@/components/splash-screen";
import { TurningLogo } from "@/assets";

interface AuthProviderProps {
  children: ReactNode;
}

let interval: NodeJS.Timeout | undefined = undefined;

export function AuthInitializer(props: AuthProviderProps): JSX.Element {
  const { children } = props;
  const [isInitialized, setIsInitialized] = useState(true);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state: any) => state.auth);

  const [getAuthMe] = useLazyAuthMeQuery();

  useEffect(() => {
    const authMe = async () => {
      try {
        await getAuthMe({ refreshToken }).unwrap();
      } catch (error: any) {
        toast.error(error?.data?.message || "Something Went Wrong");
        dispatch(authActions.logout());
      }
    };

    if (isValidToken(accessToken)) {
      const oneMinBeforeExpTime = getExpirationTime(accessToken);
      interval = setInterval(() => authMe(), oneMinBeforeExpTime);
    } else {
      dispatch(authActions.logout());
    }

    setIsInitialized(false);

    return () => clearInterval(interval);
  }, []);

  if (isInitialized) {
    return (
      <SplashScreen>
        <Image src={TurningLogo} alt="" width={450} />
      </SplashScreen>
    );
  }

  return <>{children}</>;
}
