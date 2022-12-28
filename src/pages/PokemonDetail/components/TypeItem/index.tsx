import { getTypeColor } from "../../../../libs/helpers/type-color";
import { IUnfetchedObjectModel } from "../../../../libs/types/pokemontype.model";

type TProps = {
  type: IUnfetchedObjectModel;
};

export const TypeItem = ({ type }: TProps) => {
  return (
    <li
      style={{ background: getTypeColor(type.name) }}
      className={`w-full pt-1 pb-1 pr-2 pl-2 text-white rounded-2xl capitalize`}
    >
      {type.name}
    </li>
  );
};
