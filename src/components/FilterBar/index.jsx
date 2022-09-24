import React from "react";
import styles from "./FilterBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setGenre,
  setSortBy,
  setRuntimeLte,
  genreList,
  sortList,
  setPage,
} from "../../redux/slices/filterSlice";
import { debounce } from "lodash";

function FilterBar() {
  const dispatch = useDispatch();
  const { sortBy, genres, runtimeLte } = useSelector(selectFilter);

  const [sortByOpen, setSortByOpen] = React.useState(false);
  const [sortOpen, setSortOpen] = React.useState(true);
  const [filterOpen, setFilterOpen] = React.useState(true);
  const [runtimeValue, setRuntimeValue] = React.useState(runtimeLte);

  const onSortClick = (type) => {
    const sortByName = sortList.find((item) => item.type === type).name;
    dispatch(setSortBy({ type, name: sortByName }));
    dispatch(setPage(1));
  };
  const onGenreClick = (id) => {
    dispatch(setGenre(id));
    dispatch(setPage(1));
  };
  const changeRuntime = React.useCallback(
    debounce((str) => {
      dispatch(setRuntimeLte(str));
    }, 150),
    []
  );
  const onChangeRuntime = (e) => {
    setRuntimeValue(e.target.value);
    changeRuntime(e.target.value);
    dispatch(setPage(1));
  };
  return (
    <div>
      <div className={`${styles.filter} px-3`}>
        <div className={`${styles.filter__head}`}>
          <div className={`${styles.filter__title}`}>Сортировка</div>
          <div
            onClick={() => setSortOpen((prev) => !prev)}
            className={`${styles.filter__arrow}`}
          >
            <i
              className={`bx bx-chevron-down ${
                sortOpen ? "" : "bx-rotate-270"
              }`}
            ></i>
          </div>
        </div>
        <form className={`${styles.py12} ${sortOpen ? styles.active : ""} `}>
          <p className={`mb-2 ${styles.title}`}>Сортировать по:</p>
          <div
            onClick={() => setSortByOpen((prev) => !prev)}
            className={`${styles.select__wrapper} px-3`}
          >
            <div className={`${styles.select} ${styles.title}`}>
              {sortBy.name}
            </div>
            <ul
              className={`${styles.select__list} ${
                sortByOpen ? styles.active : ""
              } ${styles.title}`}
            >
              {sortList.map((item) => (
                <li
                  key={item.type}
                  onClick={() => {
                    onSortClick(item.type);
                  }}
                  className={`${styles.select__item}`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div className={`${styles.select__arrow}`}>
              <i className="bx bx-chevron-down"></i>
            </div>
          </div>
        </form>
      </div>

      <div className={`${styles.filter} px-3 mt-4`}>
        <div className={`${styles.filter__head}`}>
          <div className={`${styles.filter__title}`}>Фильтрация</div>
          <div
            onClick={() => setFilterOpen((prev) => !prev)}
            className={`${styles.filter__arrow}`}
          >
            <i
              className={`bx bx-chevron-down ${
                filterOpen ? "" : "bx-rotate-270"
              }`}
            ></i>
          </div>
        </div>

        <div className={`${styles.py12} ${filterOpen ? styles.active : ""} `}>
          <p className={`mb-2 ${styles.title} pb-2`}>Жанры:</p>
          <div className={`mb-2 ${styles["genres-list"]}`}>
            {genreList.map((item) => (
              <div
                className={`tag tag--outlined rounded-5 py-2 px-3 me-2 mb-2 ${
                  styles.tag
                } ${genres.includes(item.id) ? styles.active : ""}`}
                key={item.id}
                role="button"
                onClick={() => {
                  onGenreClick(item.id);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
          <p className={`mb-2 ${styles.title} py-2`}>Продолжительность:</p>
          <div className={`${styles.to}`}>До {runtimeValue} мин</div>
          <input
            value={runtimeValue}
            type="range"
            min="0"
            max="200"
            className="w-100 mt-2"
            step="10"
            onChange={(e) => {
              onChangeRuntime(e);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
