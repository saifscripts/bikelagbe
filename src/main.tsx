import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip.tsx';
import { ThemeProvider } from './contexts/ThemeProvider.tsx';
import './index.css';
import { persistor, store } from './redux/store.ts';
import router from './routes/routes.tsx';

AOS.init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TooltipProvider>
              <RouterProvider router={router} />
            </TooltipProvider>
          </LocalizationProvider>
        </PersistGate>
      </Provider>
      <Toaster richColors position="top-right" closeButton />
    </ThemeProvider>
  </StrictMode>
);
