import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PopularBar } from "../components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { setMiniSideBar, setActivePageId } from "../redux/slices/UiSlice";
import { fetchPopularMovies, selectMovies } from "../redux/slices/moviesSlice";
import {
  fetchFullMovie,
  fetchMovieTrailers,
  selectFullMovie,
} from "../redux/slices/fullMovieSlice";
function FullMovie() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { popularMoviesStatus, popularMovies } = useSelector(selectMovies);
  const { fullMovieInfo, trailers, fullMovieInfoStatus, trailersStatus } =
    useSelector(selectFullMovie);

  React.useEffect(() => {
    dispatch(setMiniSideBar(true));
    dispatch(fetchPopularMovies());
    dispatch(setActivePageId(10));
  }, []);
  React.useEffect(() => {
    dispatch(fetchFullMovie(id));
    dispatch(fetchMovieTrailers(id));
  }, [id]);

  if (fullMovieInfoStatus !== "success") {
    return <div className="fs-1 text-white"> Загрузка...</div>;
  }
  if (fullMovieInfoStatus === "error") {
    return <div className="fs-1 text-white"> Извините, произошла ошибка</div>;
  }
  return (
    <div>
      <div className="container-fluid px-md-2">
        <div
          className="fullMovie-back mt-2 mt-md-0"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${fullMovieInfo.backdrop_path}"),url("https://via.placeholder.com/1000x1000/no+image+):")`,
          }}
        >
          <div className="fullMovie-title-lg text-white d-none d-xl-block">
            <p className="mb-3">{fullMovieInfo.title}</p>
            <ul className="slider-card__tags  gap-2 mb-3 d-flex">
              {fullMovieInfo.genres &&
                fullMovieInfo.genres.map((item) => (
                  <li
                    key={item.id}
                    className="tag tag--outline rounded-5 fs-5 text-white"
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="fullMovie-title text-white mb-2 mt-3 d-xl-none">
          {fullMovieInfo.title}
        </div>
        <ul className="slider-card__tags  gap-2 mb-3 d-flex d-xl-none">
          {fullMovieInfo.genres &&
            fullMovieInfo.genres.map((item) => (
              <li key={item.id} className="tag tag--outline rounded-5 fs-5 ">
                {item.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="container-fluid px-md-2">
        <div className="row fullMovie-row">
          <div className="d-none d-md-flex col-md-2  flex-column align-items-center">
            <div className="fullMovie-rating mb-5">
              <p className="text-white fs-4 mb-2 mt-5">Рейтинг</p>
              <CircularProgressbar
                value={fullMovieInfo.vote_average}
                text={fullMovieInfo.vote_average.toFixed(2)}
                maxValue={10}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "rgb(81, 121, 255)",
                  trailColor: "transparent",
                })}
              />
            </div>
            <div>
              <p className="text-white fs-5  text-uppercase mt-5 mb-2">
                Длительность
              </p>
              <p className="fs-4 text-center">{fullMovieInfo.runtime} мин</p>
            </div>
          </div>
          <div className="col-12 col-md-7 px-md-5 fullMovie-info border-secondary">
            <p className="text-uppercase text-white fs-5 mb-2 mt-md-5">
              История
            </p>
            <p className="fs-6 lh-base">{fullMovieInfo.overview}</p>
            <p className="text-uppercase text-white fs-5 mb-2 mt-4">Детали</p>
            <p className="fs-6 lh-base">
              Статус: {fullMovieInfo.status}
              <br /> Дата выхода: {fullMovieInfo.release_date}
              <br /> Оригинальный язык: {fullMovieInfo.spoken_languages[0].name}
              <br />
            </p>
          </div>
          <div className="col-12 col-md-3  px-md-4">
            <p className="text-white text-uppercase fs-5 mt-3 mb-3">Трейлеры</p>
            {trailersStatus === "success" &&
              trailers.slice(0, 3).map((item) => {
                if (item.site === "YouTube") {
                  return (
                    <iframe
                      width="200"
                      className="fullMovie-trailer mb-3"
                      height="250"
                      src={`https://www.youtube.com/embed/${item.key}?controls=0`}
                      title="YouTube video player"
                      frame="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  );
                }
              })}
          </div>
        </div>
      </div>
      <PopularBar movies={popularMovies} status={popularMoviesStatus} />
    </div>
  );
}

export default FullMovie;
