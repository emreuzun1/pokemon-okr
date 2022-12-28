import PokemonItem from "../Home/components/PokemonItem";
import { useContext } from "react";
import { DataContext } from "../../libs/providers/DataContext";
import { COMPARISON_COLORS } from "../../constants/pokemoncomparison";
import { StatItem } from "../PokemonDetail/components/StatItem";

export const Comparison = () => {
  const { comparingPokemons } = useContext(DataContext);
  return (
    <div className="w-2/3 flex flex-col items-center justify-center py-4 px-12 mx-auto">
      <div className="h-full flex flex-wrap gap-8 mt-1">
        {comparingPokemons.length > 0 &&
          comparingPokemons.map((pokemon, index) => (
            <div
              key={pokemon.id}
              className="w-40 h-50 border-gray-400 rounded-xl"
            >
              <PokemonItem pokemon={pokemon} showType={false} />
              <div
                className="w-full h-2 rounded-xl mt-1"
                style={{ backgroundColor: COMPARISON_COLORS[index] }}
              ></div>
            </div>
          ))}
      </div>
      <div className="w-1/2 mt-8 mx-auto">
        <div className="w-full flex">
          <div className="flex flex-col flex-1">
            <div className="text-2xl font-bold">Weight</div>
            <ul>
              {comparingPokemons.map((pokemon, index) => (
                <li key={pokemon.id} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4"
                    style={{ backgroundColor: COMPARISON_COLORS[index] }}
                  ></div>
                  <div>{(pokemon.weight * 0.1).toFixed(2)} kg</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold">Height</div>
            <ul>
              {comparingPokemons.map((pokemon, index) => (
                <li key={pokemon.id} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4"
                    style={{ backgroundColor: COMPARISON_COLORS[index] }}
                  ></div>
                  <div>{pokemon.height * 10} cm</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col mt-2 p-2 bg-red-600 rounded-lg">
          <ul>
            <li>
              <h3>Hp</h3>
              {comparingPokemons.map((pokemon, index) => (
                <StatItem
                  key={pokemon.id}
                  stat={pokemon.stats[0]}
                  backgroundColor={COMPARISON_COLORS[index]}
                  showHeader={false}
                  maxValue={Math.max(...comparingPokemons.map((pokemon) => pokemon.stats[0].base_stat))}
                />
              ))}
            </li>
            <li>
              <h3>Attack</h3>
              {comparingPokemons.map((pokemon, index) => (
                <StatItem
                  key={pokemon.id}
                  stat={pokemon.stats[1]}
                  backgroundColor={COMPARISON_COLORS[index]}
                  showHeader={false}
                  maxValue={Math.max(...comparingPokemons.map((pokemon) => pokemon.stats[1].base_stat))}
                />
              ))}
            </li>
            <li>
              <h3>Defense</h3>
              {comparingPokemons.map((pokemon, index) => (
                <StatItem
                  key={pokemon.id}
                  stat={pokemon.stats[2]}
                  backgroundColor={COMPARISON_COLORS[index]}
                  showHeader={false}
                  maxValue={Math.max(...comparingPokemons.map((pokemon) => pokemon.stats[2].base_stat))}
                />
              ))}
            </li>
            <li>
              <h3>Special-Attack</h3>
              {comparingPokemons.map((pokemon, index) => (
                <StatItem
                  key={pokemon.id}
                  stat={pokemon.stats[3]}
                  backgroundColor={COMPARISON_COLORS[index]}
                  showHeader={false}
                  maxValue={Math.max(...comparingPokemons.map((pokemon) => pokemon.stats[3].base_stat))}
                />
              ))}
            </li>
            <li>
              <h3>Special-Defense</h3>
              {comparingPokemons.map((pokemon, index) => (
                <StatItem
                  key={pokemon.id}
                  stat={pokemon.stats[4]}
                  backgroundColor={COMPARISON_COLORS[index]}
                  showHeader={false}
                  maxValue={Math.max(...comparingPokemons.map((pokemon) => pokemon.stats[4].base_stat))}
                />
              ))}
            </li>
            <li>
              <h3>Speed</h3>
              {comparingPokemons.map((pokemon, index) => (
                <StatItem
                  key={pokemon.id}
                  stat={pokemon.stats[5]}
                  backgroundColor={COMPARISON_COLORS[index]}
                  showHeader={false}
                  maxValue={Math.max(...comparingPokemons.map((pokemon) => pokemon.stats[5].base_stat))}
                />
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
