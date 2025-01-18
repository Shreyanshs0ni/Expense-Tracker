import Image from "next/image";
import React from "react";

const Upgrade = () => {
  return (
    <div className="m-auto mt-[100px] flex flex-col items-center justify-center gap-10">
      <Image className="" src={"/kid.jpg"} alt="" width={500} height={300} />
      <h1 className="bg-purple-200 text-center text-3xl font-bold">
        Sorry, We&apos;re Currently Working on this :)
      </h1>
    </div>
  );
};

export default Upgrade;
