import React from "react";
import styles from "./FilterBar.module.scss";
const genreList = [
  {
    id: 28,
    name: "боевик",
  },
  {
    id: 12,
    name: "приключения",
  },
  {
    id: 16,
    name: "мультфильм",
  },
  {
    id: 35,
    name: "комедия",
  },
  {
    id: 80,
    name: "криминал",
  },
  {
    id: 99,
    name: "документальный",
  },
  {
    id: 18,
    name: "драма",
  },
  {
    id: 10751,
    name: "семейный",
  },
  {
    id: 14,
    name: "фэнтези",
  },
  {
    id: 36,
    name: "история",
  },
  {
    id: 27,
    name: "ужасы",
  },
  {
    id: 10402,
    name: "музыка",
  },
  {
    id: 9648,
    name: "детектив",
  },
  {
    id: 10749,
    name: "мелодрама",
  },
  {
    id: 878,
    name: "фантастика",
  },
  {
    id: 10770,
    name: "телевизионный фильм",
  },
  {
    id: 53,
    name: "триллер",
  },
  {
    id: 10752,
    name: "военный",
  },
  {
    id: 37,
    name: "вестерн",
  },
];
function FilterBar() {
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const [sortOpen, setSortOpen] = React.useState(true);
  const [filterOpen, setFilterOpen] = React.useState(true);
  const [sortValue, setSortValue] = React.useState("Популярности");
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
              {sortValue}
            </div>
            <ul
              className={`${styles.select__list} ${
                sortByOpen ? styles.active : ""
              } ${styles.title}`}
            >
              <li className={`${styles.select__item}`}>Популярности</li>
              <li className={`${styles.select__item}`}>Рейтингу</li>
              <li className={`${styles.select__item}`}>Дате выхода</li>
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
            {Array(40)
              .fill(0)
              .map((_, index) => (
                <div
                  className={`tag tag--outlined rounded-5 py-2 px-3 me-2 ${styles.tag}`}
                >
                  Some
                </div>
              ))}
          </div>
          <p className={`mb-2 ${styles.title} py-2`}>Продолжительность:</p>
          <div className={`${styles.to}`}>До 200 мин</div>
          <input
            type="range"
            min="0"
            max="200"
            className="w-100 mt-2"
            step="10"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
