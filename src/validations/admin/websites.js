import Yup from "..";

export const validationSchema = Yup.object().shape({
  title:Yup.string().required("Başlık gerekli"),
  subTitle:Yup.string().required("Alt Başlık gerekli"),
  slogan:Yup.string().required("Slogan gerekli"),
  email: Yup.string().email("Geçersiz email adresi").required("Email gerekli"),
  phone: Yup.string().required("Telefon numarası gerekli"),
  address: Yup.string().required("Adres gerekli"),

 
  
});
