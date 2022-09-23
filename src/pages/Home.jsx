import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {
  MainSliderCard,
  Slider,
  Search,
  MiniMovieCard,
  MovieCard,
  MovieCardLoading,
  MainSliderCardLoading,
} from "../components/";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMainSliderItems,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  selectMovies,
} from "../redux/slices/moviesSlice";
import { setGenre, genreList, clearFilters } from "../redux/slices/filterSlice";
import { setPage } from "../redux/slices/UiSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    mainSliderItems,
    mainSliderStatus,
    popularMovies,
    popularMoviesStatus,
    topRatedMovies,
    topRatedMoviesStatus,
    upcomingMovies,
    upcomingMoviesStatus,
  } = useSelector(selectMovies);

  const onGenreClick = (genreId) => {
    dispatch(setGenre(genreId));
    dispatch(setPage("navigation"));
    navigate("/navigation");
  };
  const searchHandler = (e) => {
    if (e.key === "Enter") {
      dispatch(setPage("navigation"));
      navigate("/search");
    }
  };
  React.useEffect(() => {
    dispatch(clearFilters());
  }, []);
  React.useEffect(() => {
    dispatch(fetchMainSliderItems());
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovies());
  }, []);
  return (
    <div className="container-fluid px-xl-4">
      <div className="mt-5">
        {mainSliderStatus === "success" ? (
          <Swiper
            spaceBetween={2}
            modules={[Navigation, Autoplay]}
            navigation
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
          >
            {mainSliderItems.map((item, index) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="slider-card__wrapper">
                    <MainSliderCard {...item} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <MainSliderCardLoading />
        )}
      </div>

      {popularMoviesStatus === "success" ? (
        <Slider
          listTitle={"Популярное"}
          slideList={popularMovies?.map((item) => (
            <MovieCard key={item.id} {...item} />
          ))}
        />
      ) : (
        <MovieCardLoading />
      )}

      {topRatedMoviesStatus === "success" ? (
        <Slider
          listTitle={"С высоким рейтингом"}
          slideList={topRatedMovies?.map((item) => (
            <MovieCard key={item.id} {...item} />
          ))}
        />
      ) : (
        <MovieCardLoading />
      )}

      {upcomingMoviesStatus === "success" ? (
        <Slider
          listTitle={"Предстоящие"}
          slideList={upcomingMovies?.map((item) => (
            <MovieCard key={item.id} {...item} />
          ))}
        />
      ) : (
        <MovieCardLoading />
      )}
      <div className="right-bar border border-danger">
        <p onKeyDown={searchHandler}>
          <Search />
        </p>
        <ul className="tag-list mt-3 d-flex flex-wrap">
          {genreList.slice(0, 6).map((item) => {
            return (
              <li
                className="tag rounded-5 px-3 py-2 mb-2 me-2"
                role="button"
                key={item.id}
                onClick={() => onGenreClick(item.id)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        <div className="right-bar__trending mt-4">
          <p className="title__text mb-4">Популярные</p>

          <ul className="right-bar__trending-list">
            {popularMoviesStatus === "success" ? (
              popularMovies.slice(0, 2).map((item) => {
                return <MiniMovieCard {...item} key={item.id} />;
              })
            ) : (
              <p>
                <MovieCardLoading isMini />
                <MovieCardLoading isMini />
              </p>
            )}
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
