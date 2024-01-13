import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function AuthGuard(props: any) {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [checked, setChecked] = useState<boolean>(true);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();
      const href = `/sign-in?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(false);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (checked) {
    return <>Loading...</>;
  }

  return <>{children}</>;
}
