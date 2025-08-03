import React from "react";

const LoginTypeSelector = ({ loginType, onChange }) => {
  return (
    <select
      value={loginType}
      onChange={onChange}
      className="form-input"
    >
      <option value="" disabled>
        -- Select Login Type --
      </option>
      <option value="System Operator">System Operator</option>
      <option value="System Admin">System Admin</option>
      <option value="PIBO">PIBO</option>
      <option value="Client">Client</option>
    </select>
  );
};

export default LoginTypeSelector;
