import { Card, CardContent, Typography } from "@mui/material";
import { PropertyCard } from "../PropertyCard/PropertyCard";
import { PropertySearchResult } from "../searchProvider";

interface FavouriteProps {
  favourited: PropertySearchResult[];
  onFavouriteChanged(result: PropertySearchResult): void;
}

export const Favourite = (props: FavouriteProps) => {
  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          borderBottom="1px solid gray"
          variant="h4"
          component="div"
        >
          Favourite properties
        </Typography>
        {props.favourited.map((result) => (
          <PropertyCard
            key={result.id}
            {...result}
            favourited={Boolean(
              props.favourited.find((fav) => fav.id === result.id)
            )}
            onFavouriteToggled={() => props.onFavouriteChanged(result)}
          />
        ))}
      </CardContent>
    </Card>
  );
};
