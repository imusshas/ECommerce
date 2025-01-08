import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const LoadingPage = () => {
  useGSAP(() => {

    gsap.to(".loading-box", {
      duration: 1,
      delay: 0.5,
      scale: 0,
      y: 60,
      rotate: 400,
      yoyo: true,
      repeat: -1,
      stagger: {
        amount: 1.5,
        from: "starting",
      },
    });

    gsap.to(".loading-box-container", {
      duration: 1,
      // delay: 0.5,
      scale: 0,
      yoyo: true,
      repeat: -1,
    });
  });

  return (
    <div className="loading h-screen w-full absolute position-start flex flex-center">
      <div className="loading-box-container">
        {new Array(9).fill(0).map((_, index) => (
          <div key={index} className="loading-box"></div>
        ))}
      </div>
    </div>
  );
};
