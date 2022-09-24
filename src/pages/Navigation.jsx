import React from "react";
import {
  MovieCard,
  FilterBar,
  Search,
  MovieCardLoading,
  MyPagination,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { fetchFilterMovies, selectMovies } from "../redux/slices/moviesSlice";
import {
  selectFilter,
  setFilters,
  setSearchValue,
  setPage,
} from "../redux/slices/filterSlice";
import { setPagePath } from "../redux/slices/UiSlice";

function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { sortBy, genres, runtimeLte, page } = useSelector(selectFilter);
  const { filterMovies, filterMoviesStatus } = useSelector(selectMovies);

  const onSearchEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(setPage("search"));
      navigate("/search");
    }
  };
  const onPaginateClick = (page) => {
    dispatch(setPage(page));
  };

  React.useEffect(() => {
    dispatch(setSearchValue(""));
    dispatch(setPagePath("navigation"));
  }, []);
  // Если есть поисковый запрос, то делаем диспатч на фильтры
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
      dispatch(
        fetchFilterMovies({
          sortBy: sortBy.type,
          genres: genres.join(","),
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
  return (
    <div>
      <div className="container-fluid px-4 ">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
          <p className="navigation__title text-white fs-2 text-uppercase">
            Найди лучшие фильмы
          </p>
          <p className="d-none d-md-block" onKeyDown={onSearchEnter}>
            <Search />
          </p>
        </div>
        <div className="right-bar right-bar--dynamic">
          <FilterBar />
        </div>
        <div className="grid movie-grid gap-3 gap-md-4 mb-2">
          {filterMoviesStatus === "success"
            ? filterMovies.results?.map((item, index) => {
                return (
                  <div className="g-col-10 g-col-sm-5  g-col-lg-5 g-col-xl-4">
                    <MovieCard {...item} isGrid />
                  </div>
                );
              })
            : Array(20)
                .fill(0)
                .map((_) => {
                  return (
                    <div className="g-col-10 g-col-sm-5  g-col-lg-5 g-col-xl-4">
                      <MovieCardLoading isGrid />
                    </div>
                  );
                })}
        </div>
        <div className="d-flex justify-content-center mb-4">
          <MyPagination
            count={filterMovies.total_pages}
            page={page}
            onChange={onPaginateClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
