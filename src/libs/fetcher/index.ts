const BASE_URL = "https://pokeapi.co/api/v2";

const fetcher = async (path: string) => {
  if (path.startsWith("https://pokeapi.co/api")) return fetch(path);
  return fetch(`${BASE_URL}/${path}`);
};

export default fetcher;
