import Yup from "..";

export const signupSchema = Yup.object().shape({
  email: Yup.string().email("Geçersiz email adresi").required("Email gerekli"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gerekli"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor")
    .required("Şifre onayı gerekli"),
});
