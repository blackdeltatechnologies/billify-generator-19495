import React from 'react';

const FloatingLabelInput = ({ id, label, type = 'text', value, onChange, name, className = '', disabled = false }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        className={`block px-4 pb-3 pt-5 w-full text-sm bg-background rounded-xl border-2 border-input appearance-none focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary peer disabled:bg-muted disabled:cursor-not-allowed transition-all duration-200 ${className}`}
        placeholder=" "
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete="off"
        data-lpignore="true"
        data-form-type="other"
        spellCheck="false"
        aria-autocomplete="none"
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-muted-foreground duration-200 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 rounded"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
