import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorImg from "../assets/not-found-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { PopularBar } from "../components";
import {
  fetchFullMovie,
  fetchMovieTrailers,
  selectFullMovie,
} from "../redux/slices/fullMovieSlice";
import { fetchPopularMovies, selectMovies } from "../redux/slices/moviesSlice";
import { setActivePageId, setMiniSideBar } from "../redux/slices/UiSlice";

const Sceleton = ({
  width,
  height,
  borderRadius,
  count,
}: {
  width?: number;
  height?: number;
  borderRadius?: number;
  count?: number;
}) => (
  <SkeletonTheme
    duration={3}
    baseColor="#333335"
    width={width || "100%"}
    height={height || ""}
    borderRadius={borderRadius || ""}
    highlightColor="#989898"
  >
    <div>
      <Skeleton count={count || 1} />
    </div>
  </SkeletonTheme>
);

function FullMovie() {
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const { popularMoviesStatus, popularMovies } = useSelector(selectMovies);
  const { fullMovieInfo, fullMovieInfoStatus, trailers, trailersStatus } =
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
  if (fullMovieInfoStatus === "error" || trailersStatus === "error") {
    return (
      <div
        className="d-flex fullMovieError w-100 position-absolute top-0 start-0 bottom-0 end-0 justify-content-center align-items-center text-white"
        style={{
          background: `url(${ErrorImg})`,
        }}
      >
        <div className="container">
          <p className="fs-1">
            Извините, произошла ошибка, вернитесь на <Link to="/">Главную</Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="container-fluid px-md-2">
        <div
          className="fullMovie-back mt-2 mt-md-0"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${fullMovieInfo?.backdrop_path}"),url("https://via.placeholder.com/1000/333335/?text=no+image+):")`,
          }}
        >
          <div className="fullMovie-title-lg text-white d-none d-xl-block">
            <div className="mb-3">
              {fullMovieInfo && fullMovieInfo.title ? (
                fullMovieInfo.title
              ) : (
                <Sceleton />
              )}
            </div>
            <ul className="slider-card__tags  gap-2 mb-3 d-flex flex-wrap">
              {fullMovieInfo && fullMovieInfo.genres
                ? fullMovieInfo.genres.map((item) => (
                    <li
                      key={item.id}
                      className="tag tag--outline rounded-5 fs-5 text-white"
                    >
                      {item.name}
                    </li>
                  ))
                : Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Sceleton
                        key={index}
                        width={120}
                        height={33}
                        borderRadius={20}
                      />
                    ))}
            </ul>
          </div>
        </div>
        <div className="fullMovie-title text-white mb-2 mt-3 d-xl-none">
          {fullMovieInfo && fullMovieInfo.title ? (
            fullMovieInfo.title
          ) : (
            <Sceleton width={300} />
          )}
        </div>
        <ul className="slider-card__tags flex-wrap  gap-2 mb-3 d-flex d-xl-none">
          {fullMovieInfo && fullMovieInfo.genres
            ? fullMovieInfo.genres?.map((item) => (
                <li key={item.id} className="tag tag--outline rounded-5 fs-5 ">
                  {item.name}
                </li>
              ))
            : Array(3)
                .fill(0)
                .map((_, index) => (
                  <Sceleton
                    key={index}
                    width={120}
                    height={33}
                    borderRadius={20}
                  />
                ))}
        </ul>
      </div>
      <div className="container-fluid px-md-2">
        <div className="row fullMovie-row">
          <div className="d-none d-md-flex col-md-2  flex-column align-items-center">
            <div className="fullMovie-rating mb-5">
              <p className="text-white fs-4 mb-2 mt-5">Рейтинг</p>
              <CircularProgressbar
                value={fullMovieInfo?.vote_average}
                text={
                  fullMovieInfo?.vote_average
                    ? `${String(fullMovieInfo.vote_average)}`
                    : "0"
                }
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
              <p className="fs-4 text-center">
                {fullMovieInfo && fullMovieInfo.runtime} мин
              </p>
            </div>
          </div>
          <div className="col-12 col-md-7 px-md-5 fullMovie-info border-secondary">
            <p className="text-uppercase text-white fs-5 mb-2 mt-md-5">
              История
            </p>
            <div className="fs-6 lh-base">
              {fullMovieInfo?.overview || <Sceleton count={5} />}
            </div>
            <p className="text-uppercase text-white fs-5 mb-2 mt-4">Детали</p>
            <div className="fs-6 lh-base">
              <div>Статус: {fullMovieInfo?.status || "I don't know"}</div>
              <div>
                Дата выхода: {fullMovieInfo?.release_date || "I don't know"}
              </div>
              <div>
                <span>Оригинальный язык:</span>
                {fullMovieInfo?.spoken_languages[0]?.name || "I don't know"}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3  px-md-4">
            <p className="text-white text-uppercase fs-5 mt-3 mb-3">Трейлеры</p>
            {trailers
              ? trailers.slice(0, 3).map((item) => {
                  if (item.site === "YouTube") {
                    return (
                      <iframe
                        key={item.id}
                        width="200"
                        className="fullMovie-trailer mb-3"
                        height="250"
                        src={`https://www.youtube.com/embed/${item.key}?controls=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    );
                  }
                })
              : Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div className="mb-2" key={index}>
                      <Sceleton height={200} />
                    </div>
                  ))}
          </div>
        </div>
      </div>
      <PopularBar
        movies={popularMovies}
        status={popularMoviesStatus}
      ></PopularBar>
    </div>
  );
}

export default FullMovie;
