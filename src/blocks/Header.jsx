import React, { useCallback, useEffect, useState } from "react";
import { gsap } from "gsap";

export const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => setToggleMenu((toggleMenu) => !toggleMenu);

  const animateMenu = useCallback(() => {
    const headerAnimationTimeline = gsap.timeline({
      defaults: {
        opacity: toggleMenu ? 1 : 0,
        ease: "Power0.easeInOut",
        duration: 0.4,
      },
    });

    switch (toggleMenu) {
      case true:
        headerAnimationTimeline
          .set(".menu", { autoAlpha: 1 })
          .to(".menu_background", {})
          .to(".menu_lines__deco", { stagger: 0.1 }, "-=0.1");
        break;

      default:
        headerAnimationTimeline
          .to(".menu_lines__deco", {
            stagger: { from: "end", amount: 0.1 },
          })
          .to(".menu_background", {}, "-=0.1")
          .set(".menu", { autoAlpha: 0 });
        break;
    }
  }, [toggleMenu]);

  useEffect(() => {
    animateMenu();
  }, [toggleMenu, animateMenu]);

  return (
    <header>
      <div>
        <h1 className="desktop">RAFAL BOJAR</h1>
        <h1 className="mobile">RA</h1>
        <a href="#">
          <span>ALL STORIES</span>
          <span className="plus_sign"></span>
        </a>
        <button
          type="button"
          onClick={handleToggleMenu}
          className="hamburger"
          aria-expanded={toggleMenu}
        >
          <p className="hamburger_text">MENU</p>
          <div className="hamburger_icon">
            <div className={toggleMenu ? "open hidden" : "open"}>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className={toggleMenu ? "close" : "close hidden"}>
              <i></i>
              <i></i>
            </div>
          </div>
        </button>
      </div>

      <div className="menu">
        <div className="menu_nav">
          <nav>
            <ul>
              <li>Meet Me</li>
              <li>Products</li>
              <li>Stories</li>
              <li>Essence</li>
              <li>Contact</li>
            </ul>
          </nav>

          <ul>
            <li>FACEBOOK</li>
            <li>VIMEO</li>
            <li>INSTAGRAM</li>
          </ul>
        </div>
        <div className="menu_lines">
          <span className="menu_lines__deco"></span>
          <span className="menu_lines__deco"></span>
          <span className="menu_lines__deco"></span>
          <span className="menu_lines__deco"></span>
          <span className="menu_lines__deco"></span>
        </div>
        <div className="menu_background"></div>
      </div>
    </header>
  );
};
