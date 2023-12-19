import { ThemeProvider } from "@/components/theme-provider"
import Canvas from './Pages/Canvas';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Canvas />
    </ThemeProvider>
  )
}

export default App;
