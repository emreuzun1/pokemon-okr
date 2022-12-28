import { useCallback, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import fetcher from "../../../../libs/fetcher";
import {
  Ability,
  PokemonAbility,
} from "../../../../libs/types/pokemontype.model";

type TProps = {
  ability: PokemonAbility;
  index: number;
};

export const AbilityItem = ({ ability, index }: TProps) => {
  const [fetchedAbility, setFetchedAbility] = useState<Ability | null>(null);
  const getAbility = useCallback(async () => {
    const response = await fetcher(ability.ability.url);
    const data = await response.json();
    setFetchedAbility(data);
    console.log(data);
  }, [ability.ability.url]);

  useEffect(() => {
    getAbility();
  }, [getAbility]);

  return (
    <>
      {fetchedAbility && (
        <>
          <li
            className="capitalize"
            data-tip
            data-for={`ability-${fetchedAbility.id}`}
          >
            {fetchedAbility.name}
          </li>
          <ReactTooltip
            id={`ability-${fetchedAbility.id}`}
            place="top"
            effect="solid"
            multiline
            type="info"
          >
            {
              fetchedAbility.effect_entries.filter(
                (entry) => entry.language.name === "en"
              )[0].effect
            }
          </ReactTooltip>
        </>
      )}
    </>
  );
};
