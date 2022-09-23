import React from "react";
import Search from "../components/Search";
import qs from "qs";
import { MiniMovieCard, MovieCard, MovieCardLoading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectFilter, setFilters } from "../redux/slices/filterSlice";
import {
  fetchSearchMovies,
  fetchPopularMovies,
  selectMovies,
} from "../redux/slices/moviesSlice";

function SearchPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { searchValue, page } = useSelector(selectFilter);
  const {
    searchMoviesStatus,
    searchMovies,
    popularMovies,
    popularMoviesStatus,
  } = useSelector(selectMovies);
  React.useEffect(() => {
    dispatch(fetchPopularMovies());
  }, []);
  // Парсинг параметров при первом рендере
  React.useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      dispatch(setFilters({ ...params }));
      isSearch.current = true;
    }
  }, []);
  React.useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchSearchMovies({ searchValue, page }));
    }
    isSearch.current = false;
  }, [searchValue, page]);
  // Вшиваем параметры в адресную строку если это необходимо
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        searchValue,
      });
      navigate(`/search?${queryString}`);
    }
    isMounted.current = true;
  }, [searchValue]);
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
          {searchMoviesStatus === "success"
            ? searchMovies.results?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="g-col-10 g-col-sm-5  g-col-lg-5 g-col-xl-4"
                  >
                    <MovieCard {...item} isGrid />
                  </div>
                );
              })
            : Array(20)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="g-col-10 g-col-sm-5  g-col-lg-5 g-col-xl-4"
                  >
                    <MovieCardLoading isGrid />
                  </div>
                ))}
        </div>
        <div className="right-bar border border-danger">
          <div className="right-bar__trending">
            <p className="title__text mb-4">Вам может понравиться</p>
            <ul className="right-bar__trending-list">
              {popularMoviesStatus === "success"
                ? popularMovies
                    .slice(0, 4)
                    .map((item) => <MiniMovieCard {...item} key={item.id} />)
                : Array(5)
                    .fill(0)
                    .map((_, index) => <MovieCardLoading isMini />)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
