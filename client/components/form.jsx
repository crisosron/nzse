/* eslint-disable indent */
import React from 'react';
import { useForm } from 'react-hook-form';

const Form = ({ defaultValues, children, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ ...defaultValues });

  /**
   * Render children by iterating through them using depth-first recursion.
   *
   * Recursion is required so that form elements can be detected and manipulated no matter how
   * deeply nested they are in the DOM.
   */
  const renderChildren = (children) => {
    return React.Children.map(children, (child) => {
      // Base case
      if (!React.isValidElement(child)) return child;
      if (!children || children.length === 0) return child;

      // Don't recursively call if the component is a next/js Link (causes multiple child error
      // on Link for some reason)
      if (child.props.href) {
        return child;
      }

      // If the element has a 'name' prop, assume its a form element (e.g. an InputField) of some
      // sort, therefore we do extra processing first before returning it
      //
      // What is the extra processing?
      //
      // - Register it with the useForm hook: Form elements are given 'register' as a prop. When
      // the form elements are rendered, they call function to register it against the hook imported
      // in this component, allowing this component access to the state of the form element, and making
      // the component react to the mechanisms of react-hook-form
      //
      // - Insert validation error messages as a child element of the form element if such error
      // exists: If the form element has a 'validations' prop given to it, there is a likelihood
      // for the form element to have a validation error associated with it. The error message
      // is added here via a span
      if (child.props.name) {
        let formElementChildren = undefined;

        // If it has children, recursive call to process all children that need to be rendered
        if (child.props.children) formElementChildren = renderChildren(child.props.children);

        // If the form element has an error associated with it, insert the error message as a
        // child of the form element
        if (errors[child.props.name]) {
          const errorMessage = (
            <span className='text-alert-red block'>
              {errors[child.props.name].message || 'This field is invalid'}
            </span>
          );
          formElementChildren = [formElementChildren, errorMessage];
        }

        const element = React.createElement(child.type, {
          ...{
            ...child.props,
            register,
            key: child.props.name,
            children: formElementChildren
          }
        });

        return element;
      }

      if (child.props.children) {
        // Render the child as is if it doesn't have children that are components
        if (typeof child.props.children === 'string') return child;

        child = React.cloneElement(child, {
          children: renderChildren(child.props.children) // note that child.props.children is an array in this case
        });
      }

      return child;
    });
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{renderChildren(children)}</form>;
};

export default Form;
