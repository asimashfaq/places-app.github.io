import React, { useState, useEffect, useContext, useRef } from "react";
import { SearchContext } from "../../context/SearchContext";
const PlaceSearch: React.FC = () => {
  const [value, setValue] = useState("Park");
  const [showError, setShowError] = useState(false);
  const { updateQuery } = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length < 3) {
        setShowError(true);
      } else {
        setShowError(false);
        updateQuery(value);
      }
  }, [value, updateQuery]);

  const onSubmitHandler = (
    event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLElement>
  ) => {
    event.preventDefault();
    if (value.length < 3) {
      setShowError(true);
      return false;
    } else {
      setShowError(false);
      updateQuery(value);
    }
  };
  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (newValue.length > 3) {
      setShowError(false);
    }
    setValue(newValue);
  };
  return (
    <form
      method="post"
      onSubmit={onSubmitHandler}
      className="d-flex align-items-start mx-5 flex-1 "
    >
      <div className="d-flex flex-column justify-content-start search-form flex-1">
        <input
          type="text"
          placeholder="ex. location"
          className="search-input border border-gray-300 px-2 py-1 text-gray-700 text-sm w-full rounded-sm"
          ref={inputRef}
          value={value}
          onChange={onChangeHandler}
        />{" "}
        <i className="fas fa-search i-search" onClick={onSubmitHandler}></i>
        {showError && (
          <small className="ml-1">Need be at least 3 characters</small>
        )}
      </div> 
    </form>
  );
};
export { PlaceSearch };

export default PlaceSearch;
