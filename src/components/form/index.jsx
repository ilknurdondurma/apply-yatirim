import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { lightTheme, grayDarkTheme } from "../../redux/reducers/theme/themeReducers";

const DynamicForm = ({
  fields,
  header = "",
  onSubmit,
  validationsSchema,
  initialsValues = {},
}) => {
  const initialValues = fields.reduce((acc, field) => {
    if (field.type === "checkbox") {
      acc[field.name] = initialsValues[field.name] || false;
    } else if (field.type === "select" && field.options && field.options.length > 0) {
      acc[field.name] = initialsValues[field.name] || field.options[0].value;
    } else {
      acc[field.name] = initialsValues[field.name] || "";
    }
    return acc;
  }, {});
  const fileInputRef = useRef(null);
  const formik = useFormik({
    initialValues,
    validationSchema: validationsSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    },
  });

  const theme = useSelector((state) => state.theme.theme);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 border-2 p-5 m-5 rounded-md w-full flex flex-col justify-center items-center mx-auto"
      style={theme === lightTheme ? null : grayDarkTheme}
    >
      <h2 className="text-2xl font-bold text-center mb-5 text-gray-500">{header}</h2>
      {fields.map((field) => (
        <div key={field.name} className="space-y-2 w-full">
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
                style={theme === lightTheme ? null : grayDarkTheme}

              />
            </div>
          ) : field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full p-2 border border-gray-300 rounded-md"
              style={theme === lightTheme ? null : grayDarkTheme}

            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full p-2 border border-gray-300 rounded-md"
              style={theme === lightTheme ? null : grayDarkTheme}

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
              style={theme === lightTheme ? null : grayDarkTheme}

            />
          ) : field.type === "file" ? (
            <input
              type="file"
              ref={fileInputRef}
              name={field.name}
              onChange={(event) => {
                formik.setFieldValue(field.name, event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              className="block w-full p-2 border border-gray-300 rounded-md"
              style={theme === lightTheme ? null : grayDarkTheme}

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
