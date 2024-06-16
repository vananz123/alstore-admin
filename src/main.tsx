'use client';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalStyles from './conponents/GlobalStyles/index.ts';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './routes/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import { ErrorBoundary } from 'react-error-boundary';
import PageError from './pages/Page404/PageError.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorBoundary fallback={<PageError/>}>
        <Router>
            <GlobalStyles>
                <Provider store={store}>
                    <AuthProvider>
                        <QueryClientProvider client={queryClient}>
                            <App />
                        </QueryClientProvider>
                    </AuthProvider>
                </Provider>
            </GlobalStyles>
        </Router>
    </ErrorBoundary>,
);
