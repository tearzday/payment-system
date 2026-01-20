import cls from './Selector.module.css'

interface ISelectorProps {
    id: string
    label: string
    placeholder?: string
    options: Array<{ value: string; text: string }>
    disabled?: boolean
    required?: boolean
    className?: string
    onChange: (value: string) => void
}

export const Selector = ({ id, label, placeholder, options, disabled, required, className, onChange }: ISelectorProps) => {
  return (
    <div className={className}>
        <label htmlFor={id}>{label}</label>
        <select className={cls.selector} name={id} id={id} disabled={disabled} required={required} onChange={(e) => onChange(e.target.value)}>
            {placeholder && <option value="" disabled hidden>{placeholder}</option>}
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.text}</option>
            ))}
        </select>
    </div>
  )
}
