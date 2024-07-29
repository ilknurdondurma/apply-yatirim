import Yup from "..";

export const validationSchema = Yup.object().shape({

  email: Yup.string().email("Geçersiz email adresi").required("Email gerekli"),
  phone: Yup.string().required("Telefon numarası gerekli"),
  address: Yup.string().required("Adres gerekli"),

  
});
