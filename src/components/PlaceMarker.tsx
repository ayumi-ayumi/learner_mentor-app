import React, { useState } from "react";
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { CardHeader, CardContent, CardActions, Collapse, Avatar, Typography } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserProfile } from "../interfaces/interfaces";
import { useUsersData } from "../context/UsersProvider"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PlaceMarker({ user, isOpen, setMarkerPlaceId }: { user: UserProfile, isOpen: boolean, setMarkerPlaceId: any }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [expanded, setExpanded] = useState(false);
  const { logInUser } = useUsersData();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setMarkerPlaceId(isOpen ? null : user.id)}
        position={user.place.position}
        key={user.id}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      >
        {user.uid ? <Pin
          background={user.learnerORmentor === "learner" ? "#22ccff" : "yellow"}
          borderColor={"#1e89a1"}
          scale={1.3}
        >
          {user.uid === logInUser?.uid ? "Me" : "🧑‍💻"}
        </Pin> : <Pin
          background={"pink"}
          borderColor={"#1e89a1"}
          scale={1.3}
        >
          ☕
        </Pin>}

        {isOpen && (
          <InfoWindow
            anchor={marker}
            maxWidth={400}
            // style={{
            //   height: 500,
            //   width: 500,
            //   fontSize: 30
            // }}
            onCloseClick={() => setMarkerPlaceId(null)}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={user.name}
              // subheader="September 14, 2016" 
              />
              {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
              /> */}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {user.learnerORmentor}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton> */}
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>I have been learning for </Typography>
                  <Typography paragraph>
                    {user.learningDuration}
                  </Typography>
                  <Typography paragraph>
                    I am learning
                  </Typography>
                  <Typography paragraph>
                    {user.programmingLanguages}
                  </Typography>
                  <Typography>
                    I speak {user.languages}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </InfoWindow>
        )}
      </AdvancedMarker>
    </>
  );
}
