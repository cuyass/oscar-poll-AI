
import OscarsPoll from '@/components/OscarsPoll';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  return (
    <ThemeProvider>
      <OscarsPoll />
    </ThemeProvider>
  );
};

export default Index;
