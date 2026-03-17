import { useState, useEffect } from "react";

const images = [
  "https://4kwallpapers.com/images/wallpapers/elden-ring-pc-games-playstation-4-playstation-5-xbox-one-3840x2160-7712.jpg",
  "https://cdn.mos.cms.futurecdn.net/KyCj8atGy2hBbN5HXxSGTj.jpg",
];

export default function ChangerImageFond() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return images[currentImage];
}
