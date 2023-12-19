import { ThemeProvider } from "@/components/theme-provider"
import Canvas from './Pages/Canvas';

function App() {
  return (
    // the height and margin is to make the canvas full screen
    <div style={{ height: '100%', margin: 0 }} onContextMenu={(e) => {
      e.preventDefault(); // prevent the default behaviour when right clicked
    }}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Canvas />
      </ThemeProvider>
    </div>

  )
}
export default App;
