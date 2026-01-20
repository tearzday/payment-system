import cls from './Button.module.css';
import type { ButtonHTMLAttributes } from 'react';

type ThemeButton = 'btn--primary' | 'btn--accent';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ThemeButton;
}

export const Button = ({ children, theme = 'btn--primary', ...otherProps }: IButtonProps) => {
  return (
    <button className={`${cls.btn} ${cls[theme]}`} {...otherProps}>
      {children}
    </button>
  );
};
