import * as Yup from "yup";

export const defaultValues = {
  content: "",
};

export const schema = Yup.object().shape({
  content: Yup.string().required("Required"),
});
