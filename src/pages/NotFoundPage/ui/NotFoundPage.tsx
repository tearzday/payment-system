import { Button } from '@/shared/ui';
import cls from './NotFoundPage.module.css';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={cls.container}>
      <h1>404 - Страница не найдена</h1>
      <img className={cls.image} src="https://i.gifer.com/1FA.gif" alt="Monkey" />
      <Button onClick={() => navigate('/')} theme="btn--accent">
        Вернуться на главную
      </Button>
    </div>
  );
};
