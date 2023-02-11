import classNames from 'classnames';
const InputField = ({
  placeholder,
  className,
  name,
  type,
  label,
  register,
  validations,
  applyInvalidHighlight,
  onClick,
  children,
  ...rest
}) => {
  {
    /* children is the error message that has occurred for this field (see Form component) */
  }
  const hasValidationError = !!children || applyInvalidHighlight;
  const isRequired = Object.keys(validations).includes('required');

  return (
    <div className='block mb-5 group' onClick={onClick}>
      <label
        htmlFor={name}
        className={classNames('block mb-2 group-focus-within:text-light-blue', {
          'text-alert-red': hasValidationError
        })}
      >
        {label}
        {isRequired && <span className='text-alert-red'>*</span>}
      </label>
      <input
        className={classNames(
          `border-b-2 border-gray-500 rounded-sm p-2 w-full mb-2 outline-none active:border-light-blue-900 focus:border-light-blue-900 disabled:text-gray-800 disabled:active:border-gray-500 disabled:bg-gray-100 ${className}`,
          { 'border-alert-red': hasValidationError },
          { 'bg-gray-100': type !== 'submit' }
        )}
        type={type}
        placeholder={placeholder}
        {...register(name, { ...validations })}
        {...rest}
      />
      {children}
    </div>
  );
};

export default InputField;
