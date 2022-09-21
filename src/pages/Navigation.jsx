import React from "react";
import { MovieCard, FilterBar, Search } from "../components";
const someObj = {
  backdrop_path: "/Aa9TLpNpBMyRkD8sPJ7ACKLjt0l.jpg",
  first_air_date: "2022-08-21",
  genre_ids: [10765, 18, 10759],
  id: 94997,
  name: "Дом Дракона",
  origin_country: ["US"],
  original_language: "en",
  original_name: "House of the Dragon",
  overview:
    "Члены дома Таргариенов оставляют обречённую Валирию и отправляются на запад, где обнаруживают огромную территорию, населённую враждующими королевствами.",
  popularity: 8735.731,
  poster_path: "/emAFaKrAn1mhJ3ZQbM2503a1X2s.jpg",
  vote_average: 8.6,
  vote_count: 1255,
};

function Navigation() {
  return (
    <div>
      <div className="container-fluid px-4 ">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
          <p className="navigation__title text-white fs-2 text-uppercase">
            Найди лучшие фильмы
          </p>
          <p className="d-none d-md-block">
            <Search />
          </p>
        </div>
        <div className="right-bar border border-danger right-bar--dynamic">
          <FilterBar />
        </div>
        <div className="grid movie-grid gap-3 gap-md-4">
          {Array(40)
            .fill(0)
            .map((_, index) => {
              return (
                <div className="g-col-10 g-col-sm-5  g-col-lg-5 g-col-xl-4">
                  <MovieCard {...someObj} isGrid />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
