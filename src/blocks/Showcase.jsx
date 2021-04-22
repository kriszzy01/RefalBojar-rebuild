import React, { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Section } from "../components/Section";

import image1 from "../assets/image1.jfif";
import image2 from "../assets/image2.jfif";
import image3 from "../assets/image3.jfif";
import image4 from "../assets/image4.jfif";
import image5 from "../assets/image5.jfif";

export const Showcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const directionRef = useRef("forward");
  const previousIndex = useRef();
  const listeningRef = useRef(false);

  const handleDirection = (direction) => {
    if (!direction) return;

    listeningRef.current = false;

    let sections = gsap.utils.toArray(".section");

    if (direction === "forward") {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % sections.length);
    }

    if (direction === "reverse") {
      setCurrentIndex((currentIndex) => {
        if (currentIndex <= 0) return sections.length - 1;
        return currentIndex - 1;
      });
    }
  };

  const handleEvents = useCallback(
    (event) => {
      if (!listeningRef.current) return; //some users may click too fast, do nothing if this happens (sort of debouncing)

      switch (event.type) {
        case "keyup":
          let keyDirection =
            event.key === ("ArrowDown" || "ArrowRight")
              ? "forward"
              : event.key === "ArrowUp"
              ? "reverse"
              : null;

          directionRef.current = keyDirection;
          handleDirection(keyDirection);
          break;
        default:
          if (event.deltaY === -0) return;
          let wheelDirection = event.deltaY > 0 ? "forward" : "reverse";
          directionRef.current = wheelDirection;
          handleDirection(wheelDirection);
          break;
      }
    },
    [handleDirection]
  );

  const createTl = useCallback(() => {
    return gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 1.2 },
      paused: true,
      onComplete: () => {
        previousIndex.current = currentIndex;
        listeningRef.current = true;
      },
    });
  }, [currentIndex]);

  const slideInAnimation = useCallback(
    (sections, images, outerWrappers, innerWrappers) => {
      if (directionRef.current !== "forward") return;

      if (previousIndex.current !== undefined) {
        gsap.set(sections[previousIndex.current], { zIndex: 0 });
      }

      gsap.set(sections[currentIndex], { zIndex: 1, autoAlpha: 1 });

      const tl = createTl();

      tl.to(
        [innerWrappers[currentIndex], outerWrappers[currentIndex]],
        {
          yPercent: 0,
        },
        0
      )
        .from(images[currentIndex], { yPercent: 20, scale: 1.05 }, 0)
        .to(images[previousIndex.current], { yPercent: -15 }, 0);

      if (previousIndex.current !== undefined) {
        //Prepare sections for next iteration
        tl.add(
          gsap
            .timeline()
            .set(images[previousIndex.current], { yPercent: 0 })
            .set(sections[previousIndex.current], { autoAlpha: 0 })
            .set(outerWrappers[previousIndex.current], { yPercent: 100 })
            .set(innerWrappers[previousIndex.current], { yPercent: -100 })
        );
      }
      tl.play();
    },
    [currentIndex, createTl]
  );

  const slideOutAnimation = useCallback(
    (sections, images, outerWrappers, innerWrappers) => {
      if (directionRef.current !== "reverse") return;
      gsap.set(sections[currentIndex], { autoAlpha: 1, zIndex: 0 });
      gsap.set(sections[previousIndex.current], { zIndex: 1 });

      gsap.set([innerWrappers[currentIndex], outerWrappers[currentIndex]], {
        yPercent: 0,
      });

      const tl = createTl();

      tl.to(innerWrappers[previousIndex.current], { yPercent: -100 }, 0)
        .to(outerWrappers[previousIndex.current], { yPercent: 100 }, 0)
        .from(images[currentIndex], { yPercent: -20, scale: 1.05 }, 0)
        .to(images[previousIndex.current], { yPercent: 15 }, 0);

      //Prepare sections for next iteration
      tl.add(
        gsap
          .timeline()
          .set(images[previousIndex.current], { yPercent: 0 })
          .set(sections[previousIndex.current], { autoAlpha: 0 })
          .set(sections[currentIndex], { zIndex: 1 })
      );
      tl.play();
    },
    [currentIndex, createTl]
  );

  const animateLines = useCallback(
    (sections) => {
      let current = sections[currentIndex];
      const horizontalLines = current.querySelectorAll(".horizontal_lines");
      const verticalLines = current.querySelectorAll(".vertical_lines");

      gsap.from(horizontalLines, {
        width: 0,
        stagger: { each: 0.3 },
        duration: 0.7,
        ease: "Power2.easeInOut",
      });

      gsap.from(verticalLines, {
        height: 0,
        stagger: { each: 0.3 },
        duration: 0.5,
        ease: "Power2.easeInOut",
      });
    },
    [currentIndex]
  );

  useEffect(() => {
    const sections = gsap.utils.toArray(".section");
    const images = gsap.utils.toArray(".section_background_image");
    const outerWrappers = gsap.utils.toArray(".section_outer");
    const innerWrappers = gsap.utils.toArray(".section_inner");

    slideInAnimation(sections, images, outerWrappers, innerWrappers);
    slideOutAnimation(sections, images, outerWrappers, innerWrappers);
    animateLines(sections);
  }, [currentIndex, slideInAnimation, slideOutAnimation, animateLines]);

  useEffect(() => {
    const outerWrappers = gsap.utils.toArray(".section_outer");
    const innerWrappers = gsap.utils.toArray(".section_inner");

    gsap.set(innerWrappers, { yPercent: -100 });
    gsap.set(outerWrappers, { yPercent: 100 });
  }, []);

  useEffect(() => {
    window.onkeyup = (event) => handleEvents(event);
  }, [handleEvents]);

  return (
    <main className="showcase" onWheel={handleEvents}>
      <Section background={image5} />
      <Section background={image4} />
      <Section background={image3} />
      <Section background={image2} />
      <Section background={image1} />
    </main>
  );
};
