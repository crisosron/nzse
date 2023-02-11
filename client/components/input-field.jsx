import classNames from 'classnames';
import { useState } from 'react';

const SelectInput = (props) => {
  const { options, name, className, register, validations, placeholder } = props;
  const [valueSelected, setValueSelected] = useState(false);

  return (
    <select
      name={name}
      id={`select-${name}`}
      className={classNames(className, { 'text-gray': !valueSelected })}
      placeholder={placeholder}
      {...register(name, { ...validations })}
      onChange={() => setValueSelected(true)}
    >
      {placeholder && (
        <option value='' disabled selected hidden>
          {placeholder}
        </option>
      )}
      {options &&
        options.map((option, index) => {
          if (!option.value || !option.label) return <></>;
          return (
            <option
              key={`select-${name}-option-${index}`}
              value={option.value}
              className='text-charcoal'
            >
              {option.label}
            </option>
          );
        })}
    </select>
  );
};

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
  options,
  children,
  ...rest
}) => {
  {
    /* children is the error message that has occurred for this field (see Form component) */
  }
  const hasValidationError = !!children || applyInvalidHighlight;
  const isRequired = validations && Object.keys(validations).includes('required');

  const inputClassName = classNames(
    `border-b-2 border-gray-500 rounded-sm p-2 w-full mb-2 outline-none active:border-light-blue-900 focus:border-light-blue-900 disabled:text-gray-800 disabled:active:border-gray-500 disabled:bg-gray-100 ${className}`,
    { 'border-alert-red': hasValidationError },
    { 'bg-gray-100': type !== 'submit' }
  );

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
      {type === 'select' ? (
        <SelectInput
          className={inputClassName}
          name={name}
          options={options}
          register={register}
          placeholder={placeholder}
          applyInvalidHighlight
        />
      ) : (
        <input
          className={inputClassName}
          type={type}
          placeholder={placeholder}
          {...register(name, { ...validations })}
          {...rest}
        />
      )}
      {children}
    </div>
  );
};

export default InputField;
