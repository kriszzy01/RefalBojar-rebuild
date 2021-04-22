import React, { useEffect } from "react";
import gsap from "gsap";

export const Loader = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    //tl.to()
  }, []);
  
  return (
    <div className="loader">
      <p>Loader</p>
    </div>
  );
};
