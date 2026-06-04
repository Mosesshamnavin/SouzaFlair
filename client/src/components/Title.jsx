import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-3 items-center mb-3 select-none">
      <h3 className="font-serif text-2xl sm:text-3xl tracking-widest text-text-muted uppercase">
        {text1} <span className="text-primary font-bold">{text2}</span>
      </h3>
      <span className="w-8 sm:w-14 h-[1.5px] bg-secondary inline-block"></span>
    </div>
  );
};

export default Title;
