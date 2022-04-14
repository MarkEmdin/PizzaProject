import React from 'react';
import classNames from 'classnames';

const Button = ({ onClick, className, outline, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        buttonoutline: outline,
      })}>
      {children}
    </button>
  );
};

export default Button;
