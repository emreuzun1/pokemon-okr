import { getTypeColor } from "../../../../libs/helpers/type-color";
import { IPokemonModel } from "../../../../libs/types/pokemontype.model";
import ImageWithFallback from "../../../../components/ImageWithFallback";

type TProps = {
  pokemon: IPokemonModel;
  showType?: boolean;
};

const PokemonItem = ({ pokemon, showType = true }: TProps) => {
  return (
    <div className="relative group hover:scale-105 bg-slate-200 h-full p-2 rounded-md overflow-hidden transition-transform ease-in duration-[400]">
      <div className="flex w-full justify-center uppercase text-xl truncate">
        {pokemon.name}
      </div>
      <figure className="flex h-2/3 items-center justify-center">
        <ImageWithFallback
          className="h-full group-hover:scale-105 transition-transform ease-in duration-[400]"
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
        />
      </figure>
      <div>#{pokemon.id}</div>
      {showType && (
        <div className="flex gap-2">
          {pokemon.types.map(({ type }) => (
            <div
              className={`pt-1 pb-1 pr-2 pl-2 text-white rounded-2xl capitalize`}
              key={type.name}
              style={{
                background: getTypeColor(type.name),
              }}
            >
              {type.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonItem;
