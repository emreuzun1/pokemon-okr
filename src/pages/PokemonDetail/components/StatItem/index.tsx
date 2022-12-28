import { PokemonStat } from "../../../../libs/types/pokemontype.model";

type TProps = {
  stat: PokemonStat;
  backgroundColor?: string;
  showHeader?: boolean;
  maxValue?: number;
};

export const StatItem = ({
  stat,
  backgroundColor,
  showHeader = true,
  maxValue = 100,
}: TProps) => {
  const percentageOfStat = maxValue < 100 ? stat.base_stat : 100 / (maxValue / stat.base_stat);
  return (
    <li className="flex flex-col">
      {showHeader && (
        <div className="text-xl font-bold capitalize ">{stat.stat.name}</div>
      )}
      <div className="flex items-center gap-1">
        <div className="relative flex-1 h-4 rounded-md bg-white overflow-hidden">
          <div
            className="stat-bar h-full absolute bg-blue-700"
            style={{
              width: percentageOfStat + "%",
              backgroundColor: backgroundColor ?? "",
            }}
          ></div>
        </div>
        <div>{stat.base_stat}</div>
      </div>
    </li>
  );
};
