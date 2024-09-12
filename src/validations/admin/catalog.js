import Yup from "..";

export const validationSchema = Yup.object({
    name: Yup.string().required("Katalog Adı boş olamaz"),
    description: Yup.string().required("Katalog Açıklaması boş olamaz"),
    file: Yup.mixed().required("Katalog Dosyası boş olamaz"),
  });
