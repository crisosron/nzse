import classNames from 'classnames';

const Notice = ({ type, children, className }) => {
  return (
    <div
      className={classNames(
        `flex items-center justify-center p-5 md:p-5 rounded-md w-full border-2 mb-10 ${className}`,
        { 'bg-light-blue-300 border-light-blue': type === 'info' },
        { 'bg-alert-orange-400 border-alert-orange': type === 'alert' },
        { 'bg-alert-red-400 border-alert-red': type === 'danger' }
      )}
    >
      {children}
    </div>
  );
};

export default Notice;
