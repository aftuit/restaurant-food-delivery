import React from "react";

const SearchContext = React.createContext();

function useSearch() {
  const ctx = React.useContext(SearchContext);
  return [ctx.search, ctx.setSearch];
}

function SearchProvider({ children }) {
  const [search, setSearch] = React.useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export { useSearch, SearchProvider };
