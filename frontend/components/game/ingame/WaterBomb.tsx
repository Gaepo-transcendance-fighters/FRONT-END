"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Stack } from "@mui/material";

//물풍선이 터지는 효과

const transparency = (
  <Image
    style={{
      opacity: 0,
    }}
    src="/water.png"
    width="50"
    height="50"
    alt="water"
  />
);

const water_end_up = (
  <Image src="/water_end.png" width="50" height="50" alt="water end" />
);

const water_end_down = (
  <Image
    style={{
      transform: "rotate(180deg)",
    }}
    src="/water_end.png"
    width="50"
    height="50"
    alt="water end"
  />
);

const WaterBomb = ({ images }: { images: JSX.Element[] }) => {
  const [visibleImage, setVisibleImage] = useState(images);

  const handleAnimationEnd = (index: number) => {
    setVisibleImage((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setVisibleImage(images);
  }, [images]);

  return (
    <>
      {visibleImage.map((image, id) => (
        <>
          <div
            key={id}
            className={styles.moveAndFadeUp}
            onAnimationEnd={() => handleAnimationEnd(id)}
          >
            {image}
          </div>
          <div
            key={id}
            className={styles.moveAndFadeDown}
            onAnimationEnd={() => handleAnimationEnd(id)}
          >
            {image}
          </div>
        </>
      ))}
    </>
  );
};

export default WaterBomb;
