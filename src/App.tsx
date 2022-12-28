import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error } from "./pages/404";
import { Comparison } from "./pages/Comparison";
import Home from "./pages/Home";
import LayoutMain from "./pages/layouts/LayoutMain";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<Home />}></Route>
          <Route path="/pokemons/:id" element={<PokemonDetail />} />
          <Route path="/pokemons/comparison" element={<Comparison />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
