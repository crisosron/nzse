import React from 'react';
import { useForm } from 'react-hook-form';

const Form = ({ defaultValues, children, onSubmit}) => {
  const {handleSubmit, register, formState: { errors }} = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {

        const element = child.props.name ? React.createElement(child.type, {
          ...{
            ...child.props,
            register,
            key: child.props.name,
            children: child.props.name && errors[child.props.name] ? React.createElement('span', { className: 'text-alert-red' }, errors[child.props.name].message || 'This field is invalid' ) : undefined
          },
        }) : child;

        return element;

      })}
    </form>
  );
};

export default Form;