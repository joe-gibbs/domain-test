import { PropertySearchResult } from "../searchProvider";

interface FavouriteProps {
  favourited: PropertySearchResult[];
  onFavouriteChanged(result: PropertySearchResult): void;
}

export const Favourite = (props: FavouriteProps) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "black",
          textAlign: "center",
          color: "white",
        }}
      >
        Favourites
      </div>
      {props.favourited.map((result) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{result.address}</span>
          <button onClick={() => props.onFavouriteChanged(result)}>
            {props.favourited.find((f) => f.id === result.id) ? "★" : "☆"}
          </button>
        </div>
      ))}
    </div>
  );
};
