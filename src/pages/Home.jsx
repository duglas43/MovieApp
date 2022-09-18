import React from "react";
import { MainSliderCard, Slider } from "../components/";
import { Carousel } from "react-bootstrap";
function Home() {
  return (
    <div className="container">
      <Carousel>
        <Carousel.Item>
          <MainSliderCard />
        </Carousel.Item>
        <Carousel.Item>
          <MainSliderCard />
        </Carousel.Item>
        <Carousel.Item>
          <MainSliderCard />
        </Carousel.Item>
      </Carousel>
      <Slider />
      <Slider />
      <div className="right-bar border border-danger">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
        architecto.
      </div>
    </div>
  );
}

export default Home;
