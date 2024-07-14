import React, { useState } from "react";
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { Stack, CardHeader, CardContent, CardActions, Collapse, Avatar, Typography, Button, Box } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LanguageIcon from '@mui/icons-material/Language';
import HistoryIcon from '@mui/icons-material/History';
import CodeIcon from '@mui/icons-material/Code';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CafeDetailType, UserProfileType } from "../interfaces/interfaces";
import { useAuth } from "../context/AuthProvider";
import { avaterImgs } from "../Props/props";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import '../styles/PlaceMarker.scss'


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
  const [isFav, setIsFav] = useState(false);
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
            minWidth={200}
            onCloseClick={() => setMarkerPlaceId(null)}
          >
            <Box className="card-container">
              <div className="card_upper">
                <div className="card_upper left">
                  <img src={place_datas.avater} className="card_upper left avatar" aria-label={showDescription(place_datas.avater)} />
                </div>
                <div className="card_upper right">
                  <div className="learnerORmentor">{place_datas.learnerORmentor}</div>
                  <div className="name">{place_datas.name}</div>
                </div>
              </div>

              {place_datas.uid && <>
                {/* <Button variant="contained" endIcon={<SendIcon />} onClick={() => navigate('/chat')}>
                </Button> */}
                <Stack direction="row" justifyContent="center" spacing={1}>

                  <IconButton aria-label="chat">
                    <ChatIcon color="primary" />
                  </IconButton>
                  <IconButton aria-label="favorite" onClick={() => setIsFav(!isFav)}>
                    {isFav
                      ?
                      <FavoriteIcon color="primary" />
                      :
                      <FavoriteBorderIcon color="primary" />
                    }
                  </IconButton>
                </Stack>

                {/* <CardActions > */}
                <CardActions disableSpacing>
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
                    <div>
                      <HistoryIcon />
                      <span className="profile learningDuration" >{place_datas.learningDuration}</span>
                    </div>
                    <div>
                      <CodeIcon />
                      {place_datas.programmingLanguages.map((programmingLanguage) => (
                        <span className="profile programmingLanguages" key={programmingLanguage}>{programmingLanguage}</span>
                      ))}
                    </div>
                    <div>
                      <LanguageIcon />
                      {place_datas.languages.map((language) => (
                        <span className="profile languages" key={language}>{language}</span>
                      ))}
                    </div>
                  </CardContent>
                </Collapse>
              </>}
            </Box>
          </InfoWindow>
        )}
      </AdvancedMarker >
    </>
  );
}
