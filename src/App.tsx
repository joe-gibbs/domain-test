import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Favourite } from "./Favourite/Favourite";
import { Search } from "./Search/Search";
import { getAccessToken, PropertySearchResult } from "./searchProvider";

function App() {
  const [accessToken, updateAccessToken] = useState("");
  const [favourited, updateFavourited] = useState([] as PropertySearchResult[]);

  useEffect(() => {
    getAccessToken(
      "client_4c2d4fd5a5a2e63ccf1299112cac90b1",
      "secret_4eea8bc506fad3b30fe861f54f2e87d4"
    ).then((token) => updateAccessToken(token));
  }, []);

  const toggleFavourite = (result: PropertySearchResult) => {
    if (favourited.find((f) => f.id === result.id)) {
      updateFavourited(favourited.filter((f) => f.id !== result.id));
    } else {
      updateFavourited([...favourited, result]);
    }
  };

  return (
      <Container>
        <Grid spacing={3} container>
          <Grid xs={6} item>
            <Search
              accessToken={accessToken}
              favourited={favourited}
              onFavouriteChanged={toggleFavourite}
            />
          </Grid>

          <Grid xs={6} item>
            <Favourite
              favourited={favourited}
              onFavouriteChanged={toggleFavourite}
            />
          </Grid>
        </Grid>
      </Container>
  );
}

export default App;
