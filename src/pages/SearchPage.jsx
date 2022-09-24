import React from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MiniMovieCard,
  MovieCard,
  MovieCardLoading,
  MyPagination,
  Search,
  PopularBar,
} from "../components";
import placeholderImg from "../assets/search-img.jpg";
import { selectFilter, setFilters, setPage } from "../redux/slices/filterSlice";
import {
  fetchSearchMovies,
  fetchPopularMovies,
  selectMovies,
} from "../redux/slices/moviesSlice";
import { setPagePath } from "../redux/slices/UiSlice";

function SearchResult() {
  const { searchMoviesStatus, searchMovies } = useSelector(selectMovies);
  if (searchMoviesStatus === "success" && searchMovies.results.length > 0) {
    return searchMovies.results.map((item) => (
      <div key={item.id} className="g-col-10 g-col-sm-5  g-col-lg-5 g-col-xl-4">
        <MovieCard {...item} isGrid />
      </div>
    ));
  }
  return Array(20)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="g-col-10 g-col-sm-5  g-col-lg-5 g-col-xl-4">
        <MovieCardLoading isGrid />
      </div>
    ));
}
function SearchPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { searchValue, page } = useSelector(selectFilter);
  const { searchMovies, popularMovies, popularMoviesStatus } =
    useSelector(selectMovies);

  const onPaginateClick = (page) => {
    dispatch(setPage(page));
  };
  const declOfNum = (number, words) => {
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
  };
  React.useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(setPagePath("search"));
  }, []);
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
    if (!isSearch.current && isMounted.current) {
      dispatch(fetchSearchMovies({ searchValue, page }));
    }
    isSearch.current = false;
  }, [searchValue, page]);
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        searchValue,
        page,
      });
      navigate(`/search?${queryString}`);
    }
    isMounted.current = true;
  }, [searchValue, page]);
  return (
    <div>
      <div className="container-fluid px-5 ">
        <h2 className="text-white fs-2 mt-4 text-center mb-3">
          Найди свои любимые фильмы
        </h2>
        <div className="mb-4">
          <Search />
          {searchValue && (
            <p className="text-white fs-5 mt-3">
              Результаты поиска по запросу "{searchValue}" (
              {searchMovies.total_results}{" "}
              {declOfNum(searchMovies.total_results, [
                "фильм",
                "фильма",
                "фильмов",
              ])}{" "}
              {declOfNum(searchMovies.total_results, [
                "найден",
                "найдено",
                "найдено",
              ])}
              )
            </p>
          )}
        </div>
        {searchValue ? (
          <div className="grid movie-grid gap-3 gap-md-4 mb-3">
            <SearchResult />
          </div>
        ) : (
          <img src={placeholderImg} alt="" className="rounded-3 w-100 " />
        )}
        <PopularBar movies={popularMovies} status={popularMoviesStatus} />
        <div className="d-flex justify-content-center mb-4">
          {searchValue && (
            <MyPagination
              count={searchMovies.total_pages}
              onChange={onPaginateClick}
              page={page}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
