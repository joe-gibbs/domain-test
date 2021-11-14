import { useState } from "react";
import { PropertySearchResult, searchProperties } from "../searchProvider";

interface SearchProps {
  accessToken: string;
  favourited: PropertySearchResult[];
  onFavouriteChanged(id: PropertySearchResult): void;
}

//Set query timeout outside component so it doesn't mutate
let queryTimeout: NodeJS.Timeout = setTimeout(() => {}, 0);

export const Search = (props: SearchProps) => {
  const [query, updateQuery] = useState("");
  const [results, updateResults] = useState([] as PropertySearchResult[]);

  //Debounce query input
  const queryDomain = (q: string) => {
    clearTimeout(queryTimeout);

    //Clear form if nothing entered
    if (q === "") {
        updateResults([]);
    } else {
        //Fetch properties
        queryTimeout = setTimeout(() => {
          searchProperties(props.accessToken, q).then((res) => updateResults(res));
        }, 500);
    }
  };

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value);
    queryDomain(e.target.value);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "black",
          textAlign: "center",
          color: "white",
        }}
      >
        Search
      </div>
      <input
        id="search-input"
        style={{ width: "100%", boxSizing: "border-box" }}
        type="text"
        value={query}
        onChange={changeQuery}
        placeholder="Enter suburb"
      />
      {results.map((result) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{result.address}</span>
          <button onClick={() => props.onFavouriteChanged(result)}>
            {props.favourited.find(f => f.id === result.id) ? "★" : "☆"}
          </button>
        </div>
      ))}
    </div>
  );
};
