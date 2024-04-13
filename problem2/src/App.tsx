import SwapForm from "./form/Form";
import { ThemeProvider } from "./provider/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SwapForm />
      <Toaster />
    </ThemeProvider>
  );
};
export default App;
