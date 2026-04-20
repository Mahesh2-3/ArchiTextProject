import gsap from "gsap";
import React, { useEffect } from "react";

const Background = () => {
  useEffect(() => {
    gsap.fromTo(
      ".letter",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        ease: "power3.out",
      },
    );
  }, []);
  return (
    <div className="absolute inset-0 select-none z-1 h-full w-full bg-(--bg-main) bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_2px,transparent_2px)] bg-size-[50px_50px] flex items-center justify-center text-(--bg-card) text-9xl font-extrabold tracking-widest">
      {" "}
      {"ArchiText".split("").map((letter, index) => (
        <span className="letter" key={index}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Background;
