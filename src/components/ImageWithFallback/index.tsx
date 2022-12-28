import { useEffect, useState } from "react";
import clsx from "clsx";

type TProps = {
  src: string;
  alt?: string;
  className?: string | string[];
};

const ImageWithFallback = ({ src, alt = "default", className }: TProps) => {
  const fallbackImageSrc = "/images/no-image.png";

  const [imgSource, setImgSource] = useState<string>(src);

  const onErrorHandler = () => {
    setImgSource(fallbackImageSrc);
  };

  useEffect(() => {
    if (src === null) {
      setImgSource(fallbackImageSrc);
    }
  }, [imgSource, src]);

  return (
    <img
      src={imgSource}
      alt={alt}
      onError={onErrorHandler}
      className={clsx(className)}
    />
  );
};

export default ImageWithFallback;
