/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

const EmailCard = () => {
  return (
    <section className=" text-white  flex   items-center justify-center h-screen">
      {/*card*/}
      <div className="bg-slate-300 p-2 mx-6 rounded-2xl">
        {/*flrx container*/}
        <div className="flex flex-col md:flex-row rounded-xl">
          <img src="/Assets/images.jpeg" alt="MG" className="object-fit  " />
        </div>
      </div>
    </section>
  );
};

export default EmailCard;
