import React from "react";
import styles from "./Search.module.scss";
function Search() {
  return (
    <div className={`${styles.root}`}>
      <i className={`bx bx-search ${styles.icon} ps-2`}></i>
      <i class={`bx bx-x ${styles.clear} pe-2 pointer`} role="button"></i>
      <input
        type="text"
        className={`${styles.input} rounded-5`}
        placeholder="Поиск..."
      />
    </div>
  );
}

export default Search;
