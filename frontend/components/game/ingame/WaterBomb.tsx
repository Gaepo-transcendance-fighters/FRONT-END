"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css"
import { Stack } from "@mui/material";

//물풍선이 터지는 효과

const transparency = 
<Image 
  style={{
    opacity: 0,
  }}
  src="/water.png" 
  width="50" 
  height="50" 
  alt="water" />;

const water = 
<Image 
  src="/water.png" 
  width="50" 
  height="50" 
  alt="water" />;

const water_end_up = 
  <Image
    src="/water_end.png"
    width="50"
    height="50"
    alt="water end" />

const water_end_down =
  <Image
    style={{
      transform: "rotate(180deg)",
    }}
    src="/water_end.png"
    width="50"
    height="50"
    alt="water end" />

const images = [
  water,
  water,
  water
]

const WaterBomb = ({x, y}: {x: number, y: number}) => {
  const [visibleImage, setVisibleImage] = useState(images)

  const handleAnimationEnd = (index: number) => {
    setVisibleImage(prev => prev.filter((_, i) => i !== index))
  }
  
  return (
  <Stack
    style={{ 
      zIndex : 4, 
      transform: `translate(${x}px, ${y}px)`, 
      position: 'absolute',
    }}
  >
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
    )
    )}
  </Stack>);
};

export default WaterBomb;
