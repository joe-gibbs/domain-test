import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Bathroom,
  BedroomParent,
  LocalParking,
  Star,
  StarBorder,
} from "@mui/icons-material";

interface PropertyCardProps {
  imageUrl: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  carspaces: number;
  favourited: boolean;
  onFavouriteToggled: () => void;
}

export const PropertyCard = (props: PropertyCardProps) => {
  return (
    <Card style={{ marginTop: "1em" }}>
      <CardMedia
        component="img"
        height="240"
        image={props.imageUrl}
        alt={props.address}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.address}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <BedroomParent />
            </ListItemIcon>
            <ListItemText
              primary={
                props.bedrooms === 1
                  ? "1 bedroom"
                  : props.bedrooms + " bedrooms"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Bathroom />
            </ListItemIcon>
            <ListItemText
              primary={
                props.bathrooms === 1
                  ? "1 bathroom"
                  : props.bathrooms + " bathrooms"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocalParking />
            </ListItemIcon>
            <ListItemText
              primary={
                props.carspaces === 1
                  ? "1 car space"
                  : props.carspaces + " car spaces"
              }
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button onClick={() => props.onFavouriteToggled()} variant="contained">
          {props.favourited ? <Star /> : <StarBorder />}
        </Button>
      </CardActions>
    </Card>
  );
};
