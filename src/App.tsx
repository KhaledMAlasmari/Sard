import { ThemeProvider } from "@/components/theme-provider"
import Canvas from './Pages/Canvas';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import useStore from './utils/nodeStore';
import nodeTypes from './utils/NodeTypes'

function App() {
  const addNode = useStore((state) => state.addNode);
  return (
    <div style={{ height: '100%', margin: 0 }} onContextMenu={(e) => {
      e.preventDefault(); // prevent the default behaviour when right clicked
      console.log("Right Click");
    }}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <ContextMenu key={"hehe"}>
          <ContextMenuTrigger>
          </ContextMenuTrigger>

          <ContextMenuContent>
            {Object.keys(nodeTypes).map((key) => {
              return <ContextMenuItem onClick={(evt) => { addNode({ x: 50, y: 50 }, key) }} style={{ textTransform: 'capitalize' }} key={key}>{key}</ContextMenuItem>
            })}
          </ContextMenuContent>
        </ContextMenu>
        <Canvas />
      </ThemeProvider>
    </div>
  )
}

export default App;
