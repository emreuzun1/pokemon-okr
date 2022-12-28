import React, { useContext, useEffect, useState } from "react";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import Loading from "../../components/Loading";
import PokemonList from "./components/PokemonList";
import { useDebouncedSearch } from "../../libs/hooks/useDebouncedSearch";
import fetcher from "../../libs/fetcher";
import { getTypeColor } from "../../libs/helpers/type-color";
import { DataContext } from "../../libs/providers/DataContext";
import {
  ITypeModel,
  IUnfetchedObjectModel,
  IPokemonModel,
} from "../../libs/types/pokemontype.model";
import { PokemonComparison } from "./components/PokemonComparisonHeader";

const Home = () => {
  const {
    unfetchedPokemons,
    types,
    comparingPokemons,
    isComparingMode,
    setUnfetchedPokemons,
    getUnfetchedPokemons,
    switchComparingMode,
  } = useContext(DataContext);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemonModel[]>([]);

  //Gets the debounced search input and filters the data.
  const searchPokemon = (input: string) => {
    const filteredPokemons = unfetchedPokemons.filter((pokemon) =>
      pokemon.name.includes(input)
    );
    if (filteredPokemons.length === 0) return;
    setUnfetchedPokemons(filteredPokemons);
  };

  //This function provides delay when user changes the search input.
  const useSearchPokemon = () =>
    useDebouncedSearch({
      searchFunction: (value: string) => searchPokemon(value),
    });

  const { inputText, setInputText } = useSearchPokemon();

  // Data comes in IUnfetchedObjectModel type. So, we have to convert it to Pokemon type.
  // Otherwise we can't access pokemon's data.
  // This function gets all the data of 20 pokemons according to the pageIndex. Ex: 0-20.
  const fetchPokemons = async () => {
    const result: IPokemonModel[] = await Promise.all(
      unfetchedPokemons
        .slice(pageIndex * 20, (pageIndex + 1) * 20)
        .map((unfetchedPokemon) =>
          fetcher(unfetchedPokemon.url).then((res) => res.json())
        )
    );
    setFilteredPokemons(result);
  };

  const fetchType = async (typeName: string) => {
    setPageIndex(0);
    if (typeName === "all") {
      getUnfetchedPokemons();
      return;
    }
    const response: Response = await fetcher(
      `https://pokeapi.co/api/v2/type/${typeName}`
    );
    const data: ITypeModel = await response.json();
    let typePokemonArr: IUnfetchedObjectModel[] = [];
    data.pokemon.map((item) => typePokemonArr.push(item.pokemon));
    setUnfetchedPokemons(typePokemonArr);
  };

  const pageHandler = (value: number) => {
    if (
      pageIndex + value < 0 ||
      pageIndex + value > Math.floor(unfetchedPokemons.length / 20)
    )
      return;
    setPageIndex((index) => index + value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unfetchedPokemons, pageIndex]);

  return (
    <>
      {isComparingMode && (
        <PokemonComparison comparingPokemons={comparingPokemons} />
      )}
      {filteredPokemons?.length > 0 && (
        <div className="w-full sm:w-2/3 mx-auto pl-12 pr-12 mt-4 ">
          <div className="flex flex-wrap justify-between">
            <button
              id="compare-btn"
              className="flex items-center gap-1 h-8 px-2 mt-2 order-2 sm:mt-0 md:order-1 bg-red-600 text-white hover:bg-red-400 rounded-lg  transition-all ease-in duration-300"
              onClick={() => {
                switchComparingMode(true);
              }}
            >
              <MdOutlineCompareArrows size={24} color="white" />
              <span>Compare</span>
            </button>
            <input
              type="search"
              className="w-full md:order-2 order-4 mt-1 md:mt-0 md:w-1/2 h-8 bg-slate-200 rounded-md p-1"
              placeholder="Search for a Pokemon"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputText(e.currentTarget.value)
              }
              value={inputText}
            />
            <div className="order-3">
              <button
                className="flex items-center gap-1 px-2 h-8 mt-2 sm:mt-0 bg-red-600 text-white  hover:bg-red-400 rounded-lg transition-all ease-in duration-300"
                onClick={() => {
                  document
                    .getElementById("filter-wrapper")
                    ?.classList.toggle("active");
                }}
              >
                <FaFilter size={18} color="white" />
                Filters
              </button>
              <div className="filter-wrapper absolute bg-white z-40" id="filter-wrapper">
                <ul className="flex flex-col p-1 gap-1">
                  {types &&
                    types.map((type) => (
                      <div
                        className="py-1 px-2 text-white rounded-2xl capitalize cursor-pointer hover:scale-110 transition-transform duration-200 ease-in"
                        key={type.name}
                        style={{
                          background: getTypeColor(type.name),
                        }}
                        onClick={() => fetchType(type.name)}
                      >
                        {type.name}
                      </div>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {filteredPokemons && <PokemonList pokemons={filteredPokemons} />}
          </div>
          <div className="flex items-center justify-center mt-4 mb-4 gap-4">
            <button
              disabled={pageIndex === 0}
              className="bg-red-500 py-2 px-4 rounded-lg text-white disabled:bg-slate-300"
              onClick={() => pageHandler(-1)}
            >
              Previous Page
            </button>
            <button
              disabled={
                pageIndex + 1 > Math.floor(unfetchedPokemons.length / 20)
              }
              className="bg-red-500 py-2 px-4 rounded-lg text-white disabled:bg-slate-300"
              onClick={() => pageHandler(1)}
            >
              Next Page
            </button>
          </div>
        </div>
      )}
      {filteredPokemons.length <= 0 && <Loading />}
    </>
  );
};

export default Home;
