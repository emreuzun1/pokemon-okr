import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../../libs/providers/DataContext";
import { IPokemonModel } from "../../../../libs/types/pokemontype.model";
import PokemonItem from "../PokemonItem";

type TProps = {
  comparingPokemons: IPokemonModel[];
};

export const PokemonComparison = ({ comparingPokemons }: TProps) => {
  const { clearComparison, deleteComparingPokemon } = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="relative w-full h-50 z-50 flex flex-col justify-center items-center bg-red-600 py-1">
        <h2 className=" text-white font-bold text-xl">COMPARE TO</h2>
        <AiOutlineClose
          size={32}
          color="white"
          className="absolute right-2 top-2 cursor-pointer hover:bg-gray-400 rounded-full p-1 transition-all duration-300 ease-in"
          onClick={clearComparison}
        />
        <div className="h-full flex flex-wrap gap-8 mt-1">
          {comparingPokemons.length > 0 &&
            comparingPokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="w-40 h-50 border-gray-400 rounded-xl"
                onClick={() => deleteComparingPokemon(pokemon)}
              >
                <PokemonItem pokemon={pokemon} showType={false} />
              </div>
            ))}
        </div>
        <button
          disabled={comparingPokemons.length < 2}
          className="px-2 py-1 mt-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all duration-300 ease-in disabled:bg-gray-500 disabled:text-gray-300"
          onClick={() => navigate("/pokemons/comparison")}
        >
          Compare
        </button>
      </div>
    </>
  );
};
