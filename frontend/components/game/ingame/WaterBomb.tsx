"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Stack } from "@mui/material";

//물풍선이 터지는 효과

const WaterBomb = ({ images }: { images: JSX.Element[] }) => {
  const [visibleImage, setVisibleImage] = useState(images);

  const handleAnimationEnd = (index: number) => {
    setVisibleImage((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("play water bomb", images)
    if (images.length !== 0)
      setVisibleImage(images);
  }, [images]);

  return (
    <>
      {visibleImage.map((image, id) => (
        <>
          <div
            style={{
              margin: 0,
              padding: 0,
            }}
            key={`up_${id}`}
            className={styles.moveAndFadeUp}
            onAnimationEnd={() => handleAnimationEnd(id)}
          >
            {image}
          </div>
        </>
      ))}

      {visibleImage.map((image, id) => (
        <>
          <div
            style={{
              margin: 0,
              padding: 0,
            }}
            key={`down_${id}`}
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
