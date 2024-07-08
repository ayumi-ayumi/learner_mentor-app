import React, { useState } from "react";
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { CardHeader, CardContent, CardActions, Collapse, Avatar, Typography, Button } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CafeDetailType, UserProfileType } from "../interfaces/interfaces";
import { useAuth } from "../context/AuthProvider";
import { avaterImgs } from "../Props/props";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
export default function PlaceMarker({ place_datas, isOpen, setMarkerPlaceId }: { place_datas: any, isOpen: boolean, setMarkerPlaceId: any }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [expanded, setExpanded] = useState(false);
  const { logInUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const showDescription = (src) => {
    const desc = avaterImgs.filter(img => img.src === src).map(el => el.description).toString()
    return desc
  }

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setMarkerPlaceId(isOpen ? null : place_datas.id)}
        position={place_datas.place.position}
        key={place_datas.id}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      >
        {place_datas.uid ? <Pin
          background={place_datas.learnerORmentor === "learner" ? "#22ccff" : "yellow"}
          borderColor={"#1e89a1"}
          scale={1.3}
        >
          {place_datas.uid === logInUserProfile?.uid ? "Me" : "🧑‍💻"}
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
                  <Avatar sx={{ width: 60, height: 60 }} aria-label={showDescription(place_datas.avater)} src={place_datas.avater}>
                  </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={place_datas.name || place_datas.place.name}
              // title= {showDescription(place_datas.avater)} 
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
                  {place_datas.learnerORmentor}
                </Typography>
              </CardContent>

              {place_datas.uid && <>
                <Button variant="contained" endIcon={<SendIcon />} onClick={() => navigate('/chat')}>
                </Button>
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
                      {place_datas.learningDuration}
                    </Typography>
                    <Typography paragraph>
                      I am learning
                    </Typography>
                    <Typography paragraph>
                      {place_datas.programmingLanguages}
                    </Typography>
                    <Typography>
                      I speak {place_datas.languages}
                    </Typography>
                  </CardContent>
                </Collapse>
              </>}
            </Card>
          </InfoWindow>
        )}
      </AdvancedMarker >
    </>
  );
}
