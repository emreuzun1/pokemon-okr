import ImageWithFallback from "../ImageWithFallback";

const Loading = () => {
  return (
    <div className="flex flex-col gap-4 mx-auto mt-12 w-1/6">
      <div className="animate-spin">
        <ImageWithFallback src="/images/pokemon-logo.png" alt="Pokemon" />
      </div>
      <ul className="flex gap-4 mx-auto">
        <li className="motion-safe:animate-pulse w-4 h-4 bg-red-500 rounded-full"></li>
        <li className="motion-safe:animate-pulse delay-75 w-4 h-4 bg-red-500 rounded-full"></li>
        <li className="motion-safe:animate-pulse delay-150 w-4 h-4 bg-red-500 rounded-full"></li>
      </ul>
    </div>
  );
};

export default Loading;
