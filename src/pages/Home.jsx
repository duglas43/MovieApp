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
import { useNavigate, Link } from "react-router-dom";
import {
  fetchMainSliderItems,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  selectMovies,
} from "../redux/slices/moviesSlice";
import { setGenre, genreList, clearFilters } from "../redux/slices/filterSlice";
import { setPagePath } from "../redux/slices/UiSlice";

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
    navigate("/navigation");
  };
  const searchHandler = (e) => {
    if (e.key === "Enter") {
      navigate("/search");
    }
  };
  React.useEffect(() => {
    dispatch(clearFilters());
    dispatch(setPagePath("home"));
  }, []);
  React.useEffect(() => {
    dispatch(fetchMainSliderItems());
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovies());
  }, []);

  const popularSlider = popularMovies && (
    <Slider
      listTitle={"Популярное"}
      slideList={popularMovies.map((item) => (
        <Link to={`/movie/${item.id}`} key={item.id}>
          <MovieCard {...item} />
        </Link>
      ))}
    />
  );
  const topRatedSlider = topRatedMovies && (
    <Slider
      listTitle={"С высоким рейтингом"}
      slideList={topRatedMovies.map((item) => (
        <Link to={`/movie/${item.id}`} key={item.id}>
          <MovieCard {...item} />
        </Link>
      ))}
    />
  );
  const upComingSlider = upcomingMovies && (
    <Slider
      listTitle={"Предстоящие"}
      slideList={upcomingMovies.map((item) => (
        <Link to={`/movie/${item.id}`} key={item.id}>
          <MovieCard {...item} />
        </Link>
      ))}
    />
  );
  const popularSceleton = (
    <Slider
      listTitle={"Популярное"}
      slideList={Array(10).map((_, index) => (
        <MovieCardLoading key={index} />
      ))}
    />
  );
  const topRatedSceleton = (
    <Slider
      listTitle={"С высоким рейтингом"}
      slideList={Array(10).map((_, index) => (
        <MovieCardLoading key={index} />
      ))}
    />
  );
  const upComingScelton = (
    <Slider
      listTitle={"Предстоящие"}
      slideList={Array(10).map((_, index) => (
        <MovieCardLoading key={index} />
      ))}
    />
  );
  return (
    <div className="container-fluid px-xl-4 pb-5">
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
            {mainSliderItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="slider-card__wrapper">
                  <Link to={`/movie/${item.id}`} className="text-white">
                    <MainSliderCard {...item} />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <MainSliderCardLoading />
        )}
      </div>

      {popularMoviesStatus === "success" ? popularSlider : popularSceleton}

      {topRatedMoviesStatus === "success" ? topRatedSlider : topRatedSceleton}

      {upcomingMoviesStatus === "success" ? upComingSlider : upComingScelton}
      <div className="right-bar">
        <div onKeyDown={searchHandler}>
          <Search />
        </div>
        <ul className="tag-list mt-3 d-flex flex-wrap">
          {genreList.slice(0, 6).map((item) => (
            <li
              className="tag rounded-5 px-3 py-2 mb-2 me-2"
              role="button"
              key={item.id}
              onClick={() => onGenreClick(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="title__text mb-4">Популярные</p>

          <ul>
            {popularMoviesStatus === "success" ? (
              popularMovies.slice(0, 2).map((item) => (
                <Link to={`/movie/${item.id}`} className="text-white">
                  <MiniMovieCard {...item} key={item.id} />
                </Link>
              ))
            ) : (
              <div>
                <MovieCardLoading isMini />
                <MovieCardLoading isMini />
              </div>
            )}
          </ul>
        </div>
        <Link to="/navigation">
          <div
            className="tag right-bar__btn w-100 rounded-5 mt-3"
            role="button"
          >
            See more
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
