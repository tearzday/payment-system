import { createBrowserRouter } from 'react-router';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PaymentPage } from '@/pages/PaymentPage';
import { PaymentResultsPage } from '@/pages/PaymentResultsPage';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <PaymentPage />,
  },
  {
    path: '/payment-results',
    element: <PaymentResultsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
