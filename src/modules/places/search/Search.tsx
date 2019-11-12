import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../../../context/SearchContext";
const PlaceSearch: React.FC = () => {
  const [value, setValue] = useState("Park");
  const [showError, setShowError] = useState(false);
  const { updateQuery } = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    
    if (value.length < 3) {
    
        setShowError(true);
      } else {
        updateQuery(value)
        setShowError(false);
      }
  }, [value, updateQuery]);

  const onSubmitHandler = (
    event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLElement>
  ) => {
    event.preventDefault();
    if (value.length < 3) {
      setShowError(true);
      return event.stopPropagation();
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
      className="ml-6 flex-1"
    >
      <div className="flex flex-column search-form flex-1 relative justify-between">
        <input
          type="text"
          placeholder="ex. location"
          className="search-input border border-gray-300 px-3 py-1 text-gray-700 text-sm w-full rounded-full focus:border-gray-900 outline-none"
          ref={inputRef}
          value={value}
          onChange={onChangeHandler}
        />{" "}
        <button onClick={onSubmitHandler} className="bg-white py-1 ml-5 px-4 border border-blue-800 text-blue-800 border border-white rounded-full hover:bg-blue-800 hover:text-white hover:border-white sm:px-4">Search</button>
        {showError && (
          <small className="ml-1 absolute left-0 top-0 mt-6 pt-3 text-blue-800">Need be at least 3 characters</small>
        )}
      </div> 
    </form>
  );
};
export { PlaceSearch };

export default PlaceSearch;
