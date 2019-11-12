import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext<{
  query: string;
  updateQuery: React.Dispatch<React.SetStateAction<string>>;
}>({
  query: "",
  // tslint:disable-next-line: no-empty
  updateQuery: q => {}
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [query, updateQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, updateQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const SearchConsumer = SearchContext.Consumer;
