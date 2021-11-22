import { Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { PropertyCard } from "../PropertyCard/PropertyCard";
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
        searchProperties(props.accessToken, q).then((res) =>
          updateResults(res)
        );
      }, 500);
    }
  };

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value);
    queryDomain(e.target.value);
  };

  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          borderBottom="1px solid gray"
          variant="h4"
          component="div"
        >
          Search properties
        </Typography>
        <TextField
          id="search-input"
          style={{ width: "100%" }}
          type="text"
          value={query}
          onChange={changeQuery}
          placeholder="Enter suburb"
        />
        {results.map((result) => (
          <PropertyCard
            {...result}
            key={result.id}
            onFavouriteToggled={() => props.onFavouriteChanged(result)}
            favourited={Boolean(
              props.favourited.find((fav) => fav.id === result.id)
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
};
