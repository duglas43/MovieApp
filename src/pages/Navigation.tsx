import React from "react";
import {
  MovieCard,
  FilterBar,
  Search,
  MovieCardLoading,
  MyPagination,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import qs from "qs";
import {
  fetchFilterMovies,
  FetchMovieArgs,
  selectMovies,
} from "../redux/slices/moviesSlice";
import {
  selectFilter,
  setFilters,
  setSearchValue,
  setPage,
} from "../redux/slices/filterSlice";
import { setPagePath } from "../redux/slices/UiSlice";

function Navigation() {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { sortBy, genres, runtimeLte, page } = useSelector(selectFilter);
  const { filterMovies, filterMoviesStatus } = useSelector(selectMovies);

  const onSearchEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(setPage("search"));
      navigate("/search");
    }
  };
  const onPaginateClick = (page: number) => {
    dispatch(setPage(page));
  };

  React.useEffect(() => {
    dispatch(setSearchValue(""));
    dispatch(setPagePath("navigation"));
  }, []);
  React.useEffect(() => {
    if (location.search) {
      const params: FetchMovieArgs | any = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      params.genres = params.genres ? params.genres.map(Number) : [];
      dispatch(setFilters({ ...params }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        fetchFilterMovies({
          sortBy: sortBy.type,
          genres: genres,
          runtimeLte,
          page,
        })
      );
    }
    isSearch.current = false;
  }, [sortBy, genres, runtimeLte, page]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy,
        genres,
        runtimeLte,
        page,
      });
      navigate(`/navigation?${queryString}`);
    }
    isMounted.current = true;
  }, [sortBy, genres, runtimeLte, page]);

  const movies =
    filterMovies.results &&
    filterMovies.results.map((item) => (
      <div className="g-col-10 g-col-sm-5  g-col-lg-5 g-col-xl-4" key={item.id}>
        <Link to={`/movie/${item.id}`}>
          <MovieCard {...item} isGrid />
        </Link>
      </div>
    ));
  const sceletons = Array(20)
    .fill(0)
    .map((_, index) => (
      <div className="g-col-10 g-col-sm-5  g-col-lg-5 g-col-xl-4" key={index}>
        <MovieCardLoading isGrid />
      </div>
    ));
  return (
    <div>
      <div className="container-fluid px-4 ">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
          <p className="navigation__title text-white fs-2 text-uppercase">
            Найди лучшие фильмы
          </p>
          <div className="d-none d-md-block" onKeyDown={onSearchEnter}>
            <Search />
          </div>
        </div>
        <div className="right-bar right-bar--dynamic">
          <FilterBar />
        </div>
        <div className="grid movie-grid gap-3 gap-md-4 mb-2">
          {filterMoviesStatus === "success" ? movies : sceletons}
        </div>
        <div className="d-flex justify-content-center mb-4">
          <MyPagination
            count={filterMovies.total_pages}
            page={page}
            onChange={onPaginateClick}
          ></MyPagination>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
