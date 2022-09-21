import React from "react";
import { MainSliderCard, Slider, Search, MiniMovieCard } from "../components/";
import movieCardImg from "../assets/movieCard.jpg";
import { Carousel } from "react-bootstrap";
function Home() {
  return (
    <div className="container-fluid px-xl-4">
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
        <Search />
        <ul className="tag-list mt-3 d-flex flex-wrap">
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Drama
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Talk
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Talk
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Drama
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Drama
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Talk
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Drama
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Drama
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Talk
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Drama
          </li>
          <li className="tag rounded-5 px-3 py-2 mb-2 me-2" role="button">
            Drama
          </li>
        </ul>
        <div className="right-bar__trending mt-4">
          <p className="title__text mb-4">Популярные</p>

          <ul className="right-bar__trending-list">
            <MiniMovieCard />
            <MiniMovieCard />
          </ul>
        </div>

        <div className="tag right-bar__btn w-100 rounded-5 mt-3" role="button">
          See more
        </div>
      </div>
    </div>
  );
}

export default Home;
