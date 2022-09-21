import React from "react";
import Search from "../components/Search";
import { MiniMovieCard, MovieCard } from "../components";
import SearchImg from "../assets/search-img.jpg";
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
function SearchPage() {
  return (
    <div>
      <div className="container-fluid px-5 ">
        <h2 className="text-white fs-2 mt-4 text-center mb-3">
          Найди свои любимые фильмы
        </h2>
        <div className="mb-4">
          <Search />
        </div>

        {/* <img src={SearchImg} alt="" className="rounded-3 w-100 " /> */}
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
        <div className="right-bar border border-danger">
          <div className="right-bar__trending">
            <p className="title__text mb-4">Вам может понравиться</p>
            <ul className="right-bar__trending-list">
              {Array(10).fill(<MiniMovieCard />)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
