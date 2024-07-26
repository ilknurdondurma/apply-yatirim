import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { grayDarkTheme, grayLightTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";
import { useSelector } from "react-redux";

const DynamicForm = ({
  fields,
  header = "",
  onSubmit,
  validationsSchema,
  initialsValues = {}, // Varsayılan olarak boş nesne
}) => {
  const initialValues = fields.reduce((acc, field) => {
    if (field.type === "checkbox") {
      acc[field.name] = initialsValues[field.name] || false;
    } else if (
      field.type === "select" &&
      field.options &&
      field.options.length > 0
    ) {
      acc[field.name] = initialsValues[field.name] || field.options[0].value;
    } else {
      acc[field.name] = initialsValues[field.name] || "";
    }
    return acc;
  }, {});

  const validationSchema =
    validationsSchema ??
    fields.reduce((acc, field) => {
      if (field.name === "email") {
        acc[field.name] = Yup.string()
          .email("Geçersiz email adresi")
          .required("Email gerekli");
      } else if (field.name === "password") {
        acc[field.name] = Yup.string()
          .min(6, "Şifre en az 6 karakter olmalıdır")
          .required("Şifre gerekli");
      } else {
        acc[field.name] = Yup.string().required(`${field.label} zorunlu alan`);
      }
      return acc;
    }, {});

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const theme = useSelector((state) => state.theme.theme);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 border-2 p-5 m-5 rounded-md  w-full"
      style={theme === lightTheme ? null : grayDarkTheme}
    >
      <h2 className="text-2xl font-bold text-center mb-5 text-gray-500">{header}</h2>
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="block font-bold">{field.label}:</label>
          {field.type === "text" ||
          field.type === "password" ||
          field.type === "number" ? (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {field.icon}
              </div>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ) : field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <input
              type="checkbox"
              name={field.name}
              checked={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="ml-2"
            />
          ) : field.type === "file" ? (
            <input
              type="file"
              name={field.name}
              onChange={(event) => {
                formik.setFieldValue(field.name, event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          ) : null}
          {formik.touched[field.name] && formik.errors[field.name] ? (
            <div className="text-red-600">{formik.errors[field.name]}</div>
          ) : null}
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-white rounded-md"
      >
        Gönder
      </button>
    </form>
  );
};

export default DynamicForm;
