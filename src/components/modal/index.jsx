import React from 'react';
import PropTypes from 'prop-types';

const DynamicFormModal = ({ show, onHide, title, fields, onSubmit }) => {
  if (!show) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    onSubmit(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onHide}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <div key={index} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  defaultValue={field.defaultValue}
                  className="form-control"
                />
              </div>
            ))}
            <button type="submit" className="btn-submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

DynamicFormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      defaultValue: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DynamicFormModal;
