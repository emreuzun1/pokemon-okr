import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../libs/providers/DataContext";
import { IPokemonModel } from "../../../../libs/types/pokemontype.model";
import PokemonItem from "../PokemonItem";

type TProps = {
  pokemons: IPokemonModel[];
};

const PokemonList = ({ pokemons }: TProps) => {
  const { addComparingPokemon, isComparingMode } = useContext(DataContext);
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          {!isComparingMode && (
            <Link to={`/pokemons/${pokemon.id}`} className="h-64">
              <PokemonItem pokemon={pokemon} />
            </Link>
          )}
          {isComparingMode && (
            <div
              onClick={() => {
                try {
                  addComparingPokemon(pokemon);
                } catch (err) {
                  alert(err);
                }
              }}
              className="h-64"
            >
              <PokemonItem pokemon={pokemon} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
