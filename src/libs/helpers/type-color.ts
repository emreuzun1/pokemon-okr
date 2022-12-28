const TypeColors = {
  all: "#000000",
  bug: "#729f3f",
  dark: "#707070",
  dragon: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
  electric: "#eed535",
  fairy: "#fdb9e9",
  fighting: "#d56723",
  fire: "#fd7d24",
  flying: "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
  ghost: "#7b62a3",
  grass: "#33FF57",
  ground: "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
  ice: "#51c4e7",
  normal: "#a4acaf",
  poison: "#b97fc9",
  psychic: "#f366b9",
  rock: "#a38c21",
  steel: "#9eb7b8",
  water: "#4592c4",
};

//We have different colors for different types.
//This function returns the color of type.
export const getTypeColor = (typeName: string) => {
  return TypeColors[typeName as keyof typeof TypeColors];
};
