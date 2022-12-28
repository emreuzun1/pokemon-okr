import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { COMPARISON_SIZE } from "../../constants/pokemoncomparison";
import fetcher from "../fetcher";
import {
  IPokemonModel,
  IUnfetchedObjectModel,
} from "../types/pokemontype.model";

interface FetchResponse {
  count: number,
  next: string | null,
  previous: string | null,
  results: IUnfetchedObjectModel[];
}

type TProps = {
  unfetchedPokemons: IUnfetchedObjectModel[];
  types: IUnfetchedObjectModel[];
  comparingPokemons: IPokemonModel[];
  isComparingMode: boolean;
  setUnfetchedPokemons: (value: IUnfetchedObjectModel[]) => void;
  getUnfetchedPokemons: () => void;
  addComparingPokemon: (pokemon: IPokemonModel) => void;
  deleteComparingPokemon: (pokemon: IPokemonModel) => void;
  switchComparingMode: (value: boolean) => void;
  clearComparison: () => void;
};

export const DataContext = React.createContext<TProps>({
  unfetchedPokemons: [],
  types: [],
  comparingPokemons: [],
  isComparingMode: false,
  setUnfetchedPokemons: () => {},
  getUnfetchedPokemons: () => {},
  addComparingPokemon: () => {},
  deleteComparingPokemon: () => {},
  switchComparingMode: () => {},
  clearComparison: () => {},
});

type TProviderProps = {
  children: ReactNode;
};

export const DataContextProvider = ({ children }: TProviderProps) => {
  const [unfetchedPokemons, setUnfetchedPokemons] = useState<
    IUnfetchedObjectModel[]
  >([]);
  const [types, setTypes] = useState<IUnfetchedObjectModel[]>([
    { name: "all", url: "" },
  ]);
  const [comparingPokemons, setComparingPokemons] = useState<IPokemonModel[]>(
    []
  );
  const [isComparingMode, setIsComparingMode] = useState<boolean>(false);

  const getUnfetchedPokemons = useCallback(async () => {
    const response = await fetcher("pokemon/?limit=10000");
    const data:FetchResponse = await response.json();
    setUnfetchedPokemons(data.results);
  }, []);

  const getTypes = useCallback(async () => {
    const result = await fetcher("https://pokeapi.co/api/v2/type/");
    const data = await result.json();
    setTypes([...types, ...data.results]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addComparingPokemon = (pokemon: IPokemonModel) => {
    if (!isComparingMode) setIsComparingMode(true);
    if (comparingPokemons.length === COMPARISON_SIZE)
      throw new Error(`You can only compare ${COMPARISON_SIZE} pokemons.`);
    comparingPokemons.forEach((item) => {
      if (item.id === pokemon.id)
        throw new Error("This pokemon has already added.");
    });
    setComparingPokemons((arr) => [...arr, pokemon]);
  };

  const deleteComparingPokemon = (pokemon: IPokemonModel) => {
    const filteredArray = comparingPokemons.filter(
      (item) => item.id !== pokemon.id
    );
    setComparingPokemons(filteredArray);
  };

  const clearComparison = () => {
    setComparingPokemons([]);
    setIsComparingMode(false);
  };

  useEffect(() => {
    getUnfetchedPokemons();
    getTypes();
  }, [getUnfetchedPokemons, getTypes]);

  return (
    <DataContext.Provider
      value={{
        unfetchedPokemons,
        types,
        comparingPokemons,
        isComparingMode,
        setUnfetchedPokemons,
        getUnfetchedPokemons,
        addComparingPokemon,
        deleteComparingPokemon,
        switchComparingMode: setIsComparingMode,
        clearComparison,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
