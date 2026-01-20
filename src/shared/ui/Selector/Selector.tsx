import type { SelectHTMLAttributes } from 'react';
import cls from './Selector.module.css';

interface ISelectorProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  placeholder?: string;
  options: Array<{
    value: string;
    text: string;
  }>;
}

export const Selector = ({
  id,
  label,
  placeholder,
  options,
  className,
  ...otherProps
}: ISelectorProps) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <select className={cls.selector} name={id} id={id} {...otherProps}>
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
