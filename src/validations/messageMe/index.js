import Yup from "..";

export const messageSchema = Yup.object().shape({
  name: Yup.string().required("İsim gerekli alan"),
  email: Yup.string()
    .email("Geçersiz email adresi")
    .required("Email gerekli alan"),
  message: Yup.string().required("Mesaj gerekli alan"),
});
