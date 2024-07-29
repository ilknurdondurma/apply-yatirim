import Yup from "..";

export const validationSchema = Yup.object().shape({
  title:Yup.string().required("Başlık gerekli"),
  subTitle:Yup.string().required("Alt Başlık gerekli"),
  slogan:Yup.string().required("Slogan gerekli"),

});
