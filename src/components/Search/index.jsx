import React from "react";
import styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue, selectFilter } from "../../redux/slices/filterSlice";
import { debounce } from "lodash";
function Search() {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(selectFilter);
  const [inputValue, setInputValue] = React.useState(searchValue);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setInputValue("");
    inputRef.current?.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={`${styles.root}`}>
      <i className={`bx bx-search ${styles.icon} ps-2`}></i>
      {inputValue && (
        <i
          className={`bx bx-x ${styles.clear} pe-2 pointer`}
          role="button"
          onClick={onClickClear}
        ></i>
      )}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={onChangeInput}
        className={`${styles.input} rounded-5 text-white`}
        placeholder="Поиск..."
      />
    </div>
  );
}

export default Search;
