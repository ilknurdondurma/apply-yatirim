import Yup from "..";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Geçersiz email adresi").required("Email gerekli"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gerekli"),
});
