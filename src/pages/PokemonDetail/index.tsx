import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageWithFallback from "../../components/ImageWithFallback";
import Loading from "../../components/Loading";
import fetcher from "../../libs/fetcher";
import { IPokemonModel } from "../../libs/types/pokemontype.model";
import { AbilityItem } from "./components/AbilityItem";
import { StatItem } from "./components/StatItem";
import { TypeItem } from "./components/TypeItem";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<IPokemonModel>();
  const navigate = useNavigate();

  //Fetches the data of pokemon.
  const fetchPokemon = useCallback(async () => {
    try {
      const response = await fetcher(`pokemon/${id}`);
      const result: IPokemonModel = await response.json();
      setPokemon(result);
    } catch (err) {
      navigate("*");
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);
  return (
    <>
      {pokemon && (
        <div className="w-2/3 mx-auto mt-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl font-bold uppercase">
              {pokemon.name} <span>#{pokemon.id}</span>
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-10 mt-4">
            <div className="flex-1 p-2">
              <ImageWithFallback
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <ul className="flex gap-8 p-4 flex-wrap">
                <li className="flex flex-col ">
                  <div className="text-xl md:text-2xl font-bold">Weight</div>
                  <div>{(pokemon.weight * 0.1).toFixed(2)} kg</div>
                </li>
                <li className="flex flex-col">
                  <div className="text-xl md:text-2xl font-bold">Height</div>
                  <div>{pokemon.height * 10} cm</div>
                </li>
                <li className="flex flex-col">
                  <div className="text-xl md:text-2xl font-bold">Abilities</div>
                  <ul>
                    {pokemon.abilities.map((ability, index) => (
                      <AbilityItem
                        key={ability.ability.name}
                        ability={ability}
                        index={index}
                      />
                    ))}
                  </ul>
                </li>
              </ul>
              <div className="bg-red-600 rounded-md p-4">
                <ul className="flex flex-col gap-x-8 gap-y-2 mt-1">
                  {pokemon.stats.map((stat) => (
                    <StatItem
                      stat={stat}
                      key={stat.stat.name}
                      maxValue={Math.max(
                        ...pokemon.stats.map((stat) => stat.base_stat)
                      )}
                    />
                  ))}
                </ul>
              </div>
              <div className="flex flex-col">
                <div className="text-xl md:text-2xl font-bold">Types</div>
                <ul className="flex gap-3 mt-2">
                  {pokemon.types.map(({ type }) => (
                    <TypeItem type={type} key={type.name} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {!pokemon && <Loading />}
    </>
  );
};

export default PokemonDetail;
