import { ThemeProvider } from "@/components/theme-provider"
import Canvas from './Pages/Canvas';
import { useEffect } from "react";
import useStore from "./utils/nodeStore";
import { get_genres } from "./Services/initialDataProvider";

function App() {
  const updateAvaliableGenres = useStore((state) => state.updateAvaliableGenres)
  const updateGenre = useStore((state) => state.updateGenre)
  // initialize states from APIs
  useEffect(() => {
    const fetchData = async () => {
      const genres = await get_genres()
      updateAvaliableGenres(genres.data.genres)
      if(genres){
        updateGenre(genres.data.genres[0])
      }
    }
    fetchData()
  }, [])
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
