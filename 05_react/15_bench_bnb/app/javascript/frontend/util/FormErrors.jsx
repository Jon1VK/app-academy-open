import React from 'react';

const FormErrors = ({ errors = [] }) =>
  errors.length == 0 ? null : (
    <div className="alert alert-danger">
      {errors.map((error, idx) => (
        <div key={idx}>{error}</div>
      ))}
    </div>
  );

export default FormErrors;
