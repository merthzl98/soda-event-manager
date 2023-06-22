import React, { useRef } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import asset from "../../assets/bg/bannerEx.png";
import "./Poster.scss";

const Posters = () => {
  const ref = useRef();
  const ref2 = useRef();

  const photos = [1, 2, 3, 4, 5];

  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    interval: 15000,
    pauseOnHover: false,
    resetProgress: true,
    height: "600px",
    width: "1000px",
  };

  const handleClickImage = () => {
    ref.current.click();
  };

  const handleOutImage = () => {
    ref2.current.click();
  };

  return (
    <>
      <div className="wrapper">
        <Splide
          options={options}
          aria-labelledby="autoplay-example-heading"
          hasTrack={false}
        >
          <div style={{ position: "relative" }}>
            <SplideTrack>
              {photos.map((slide, index) => (
                <SplideSlide key={index}>
                  <img
                    onMouseEnter={handleClickImage}
                    onMouseLeave={handleOutImage}
                    src={asset}
                    alt={`Photo ${index + 1}`}
                    className="image-style"
                  />
                </SplideSlide>
              ))}
            </SplideTrack>
          </div>

          <div
            className="splide__progress"
            style={{
              position: "absolute",
              bottom: "50px",
              height: "10px",
              width: "1000px",
            }}
          >
            <div
              className="splide__progress__bar"
              style={{ margin: "1px", height: "3px", backgroundColor: "red" }}
            />
          </div>

          <button className="splide__toggle" style={{ display: "none" }}>
            <span ref={ref} className="splide__toggle__play">
              Play
            </span>
            <span ref={ref2} className="splide__toggle__pause">
              Pause
            </span>
          </button>
        </Splide>
      </div>
    </>
  );
};

export default Posters;
