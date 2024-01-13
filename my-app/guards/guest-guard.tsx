import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function GuestGuard(props: any) {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [checked, setChecked] = useState<boolean>(false);

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
