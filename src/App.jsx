import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/routes';
import { Toaster } from 'sonner';
import AuthInitializer from '@/components/AuthInitializer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 300000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthInitializer>
          <Toaster />
          <Router />
        </AuthInitializer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;