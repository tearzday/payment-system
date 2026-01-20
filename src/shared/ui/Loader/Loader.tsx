import cls from './Loader.module.css';

interface ILoaderProps {
  size?: 'sm' | 'md';
}

export function Loader({ size = 'sm' }: ILoaderProps) {
  return <div className={`${cls.loader} ${cls[size]}`} role="status" aria-label="Loading" />;
}
