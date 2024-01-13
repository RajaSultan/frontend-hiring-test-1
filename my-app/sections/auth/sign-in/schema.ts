import { getLocalStorage } from "@/utils/local-storage";
import * as Yup from "yup";

const data: any = getLocalStorage("rememberMe");

export const defaultValues: any = {
  username: data?.username ?? "",
  password: data?.password ?? "",
  loggedIn: data?.loggedIn ?? false,
};
export const schema: any = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required").min(2).max(15),
});
