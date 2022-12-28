interface IUnfetchedObjectModel {
  name: string;
  url: string;
}

interface EffectEntries {
  effect: string;
  language: IUnfetchedObjectModel;
  short_effect: string;
}

interface FlavorTextEntries {
  flavor_text: string;
  language: IUnfetchedObjectModel;
  version_group: IUnfetchedObjectModel;
}

interface Ability {
  effect_entries: EffectEntries[];
  flavor_text_entries: FlavorTextEntries[];
  generation: IUnfetchedObjectModel;
  id: number;
  is_main_series: boolean;
  name: string;
  names: {
    language: IUnfetchedObjectModel;
    name: string;
  }[];
  pokemon: {
    is_hidden: boolean;
    pokemon: IUnfetchedObjectModel;
    slot: number;
  }[];
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: IUnfetchedObjectModel;
}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
  other: {
    dream_world: {
      front_default: string;
    };
  };
}

interface Stat {
  name: string;
  game_index: number;
  is_battle_only: boolean;
}

interface PokemonStat {
  stat: Stat;
  effort: number;
  base_stat: number;
}

interface ITypeModel {
  id: number;
  name: string;
  pokemon: {
    slot: number;
    pokemon: IUnfetchedObjectModel;
  }[];
}

interface PokemonType {
  slot: number;
  type: IUnfetchedObjectModel;
}

interface IPokemonModel {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
}

export type {
  Ability,
  PokemonStat,
  IPokemonModel,
  IUnfetchedObjectModel,
  ITypeModel,
  PokemonAbility,
};
