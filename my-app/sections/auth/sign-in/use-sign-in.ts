import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./schema";
import { removeLocalStorage, setLocalStorage } from "@/utils/local-storage";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/services/auth/auth-api";
import { useRouter, useSearchParams } from "next/navigation";

export function useSignIn() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnTo = searchParams.get("returnTo");
  const [mutation, { isLoading }] = useLoginMutation();
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit } = methods;

  async function onSubmit(payload: any): Promise<any> {
    const { username, password, loggedIn } = payload;
    loggedIn
      ? setLocalStorage("rememberMe", { username, password, loggedIn })
      : removeLocalStorage("rememberMe");
    try {
      const { message } = await mutation({ username, password }).unwrap();
      toast.success(message || "Sign In Successfully!");
      router.push(returnTo || "/calls");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something Went Wrong!");
    }
  }

  return {
    handleSubmit,
    onSubmit,
    router,
    methods,
  };
}
