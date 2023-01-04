
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
  return (
    <div className="block mb-5">
      <label htmlFor={name} className="block mb-2">{label}</label>
      <input className={`border border-gray-300 rounded-md p-2 w-full mb-2 ${className}`} type={type} placeholder={placeholder} {...register(name, {...validations})} {...rest} />

      {/* children is the error message that has occurred for this field (see Form component) */}
      {children}
    </div>
  );
};

export default InputField;