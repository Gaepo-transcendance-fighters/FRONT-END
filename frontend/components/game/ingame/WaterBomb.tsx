"use client";

import Image from "next/image";

//물풍선이 터지는 효과

const water = <Image src="/water.png" width="100" height="100" alt="water" />;

const WaterBomb = (y: number) => {
  return <div>{water}</div>;
};

export default WaterBomb;
