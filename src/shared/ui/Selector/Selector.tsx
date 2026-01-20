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
  value,
  placeholder,
  options,
  ...otherProps
}: ISelectorProps) => {
  return (
    <div className={cls.container}>
      <label className={cls.label} htmlFor={id}>
        {label}
      </label>
      <select value={value || ''} className={cls.selector} name={id} id={id} {...otherProps}>
        {placeholder && (
          <option className={cls.option} value="" disabled>
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
