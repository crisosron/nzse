import classNames from 'classnames';
const InputField = ({
  placeholder,
  className,
  name,
  type,
  label,
  register,
  validations,
  children,
  ...rest
}) => {
  {
    /* children is the error message that has occurred for this field (see Form component) */
  }
  const hasValidationError = !!children;

  return (
    <div className='block mb-5 group'>
      <label
        htmlFor={name}
        className={classNames('block mb-2 group-focus-within:text-light-blue', {
          'text-alert-red': hasValidationError
        })}
      >
        {label}
      </label>
      <input
        className={classNames(
          `border-b-2 border-gray-300 rounded-sm py-2 w-full mb-2 outline-none active:border-light-blue-900 focus:border-light-blue-900 ${className}`,
          { 'border-alert-red': hasValidationError }
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
