import classNames from 'classnames';
import { useState, Children } from 'react';
import ReactMarkdown from 'react-markdown';

const InputLabel = ({ applyInvalidHighlight, name, label, isRequired }) => {
  return (
    <label
      htmlFor={name}
      className={classNames('block mb-2 group-focus-within:text-light-blue', {
        'text-alert-red': applyInvalidHighlight
      })}
    >
      {label}
      {isRequired && <span className='text-alert-red'>*</span>}
    </label>
  );
};

const SelectInput = (props) => {
  const {
    options,
    name,
    className,
    register,
    validations,
    placeholder,
    applyInvalidHighlight,
    label,
    isRequired,
    onOptionSelect,
    children
  } = props;
  const [valueSelected, setValueSelected] = useState(false);

  return (
    <>
      <InputLabel
        label={label}
        applyInvalidHighlight={applyInvalidHighlight}
        name={name}
        isRequired={isRequired}
      />
      <select
        name={name}
        id={`select-${name}`}
        className={classNames(className, { 'text-gray': !valueSelected })}
        placeholder={placeholder}
        {...register(name, { ...validations })}
        onChange={(event) => {
          setValueSelected(true);
          onOptionSelect(event.target.value);
        }}
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
      {children}
    </>
  );
};

const CheckboxInput = (props) => {
  const { name, register, validations, placeholder, isRequired, rest, children, checkboxText } =
    props;
  return (
    <>
      <div className='md:flex md:items-center'>
        <input
          className='mr-2 w-5 h-5 align-middle'
          type='checkbox'
          placeholder={placeholder}
          id={name}
          {...register(name, { ...validations })}
          {...rest}
        />
        <label htmlFor={name} className='align-middle'>
          <ReactMarkdown components={{ p: 'span' }}>{checkboxText}</ReactMarkdown>
          {isRequired && <span className='text-alert-red'>*</span>}
        </label>
      </div>
      {children}
    </>
  );
};

const StandardInput = ({
  placeholder,
  className,
  name,
  type,
  label,
  register,
  validations,
  applyInvalidHighlight,
  isRequired,
  children,
  ...rest
}) => {
  return (
    <>
      <InputLabel
        label={label}
        applyInvalidHighlight={applyInvalidHighlight}
        name={name}
        isRequired={isRequired}
      />
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name, { ...validations })}
        {...rest}
      />
      {children}
    </>
  );
};

const InputField = (props) => {
  {
    /* children is the error message that has occurred for this field (see Form component) */
  }
  const {
    children,
    applyInvalidHighlight,
    validations,
    type,
    className,
    onClick,
    onOptionSelect,
    ...rest
  } = props;

  const hasErrorMessage = () => {
    const childrenArray = Children.toArray(children);
    if (childrenArray.length === 0) return false;
    const childElement = childrenArray[0];

    // See Form component. This field will have errors if it has this element as a child
    return childElement.type === 'span' && childElement.props?.className === 'text-alert-red';
  };

  const hasValidationError = !!hasErrorMessage() || applyInvalidHighlight;
  const isRequired = validations && Object.keys(validations).includes('required');

  const inputClassName = classNames(
    `border-b-2 border-gray-500 rounded-sm p-2 w-full mb-2 outline-none active:border-light-blue-900 focus:border-light-blue-900 disabled:text-gray-800 disabled:active:border-gray-500 disabled:bg-gray-100 ${className}`,
    { 'border-alert-red': hasValidationError },
    { 'bg-gray-100': type !== 'submit' }
  );

  const renderField = () => {
    if (type === 'select') {
      return (
        <SelectInput
          {...props}
          {...rest}
          className={inputClassName}
          isRequired={isRequired}
          onOptionSelect={onOptionSelect}
        />
      );
    } else if (type === 'checkbox') {
      return (
        <CheckboxInput {...props} {...rest} className={inputClassName} isRequired={isRequired} />
      );
    } else {
      return (
        <StandardInput {...props} {...rest} className={inputClassName} isRequired={isRequired} />
      );
    }
  };

  return (
    <div className='block mb-5 group' onClick={onClick}>
      {renderField()}
    </div>
  );
};

export default InputField;
