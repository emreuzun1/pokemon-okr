import { Link } from "react-router-dom";
import ImageWithFallback from "../ImageWithFallback";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-red-600 p-5 text-white">
      <Link
        className=" flex items-center gap-2 text-xl font-['Pokemon']"
        to="/"
      >
        <div className="h-12">
          <ImageWithFallback
            src="/images/pokemon-logo.png"
            alt="Pokemon"
            className="w-full h-full bg-white rounded-full"
          />
        </div>
        <div>Pokemon</div>
      </Link>
    </div>
  );
};

export default Navbar;
