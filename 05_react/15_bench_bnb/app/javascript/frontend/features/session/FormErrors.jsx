import React from 'react';

const FormErrors = ({ errors = [] }) =>
  errors.length == 0 ? null : (
    <div>
      {errors.map((error, idx) => (
        <p key={idx}>{error}</p>
      ))}
    </div>
  );

export default FormErrors;
