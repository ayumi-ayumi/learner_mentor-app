import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary
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
import { APILoader, PlaceOverview } from '@googlemaps/extended-component-library/react';



interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


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
        {place_datas.uid
          ?
          <Pin
            background={place_datas.learnerORmentor === "learner" ? "#22ccff" : "yellow"}
            borderColor={"#1e89a1"}
            scale={1.3}
          >
            {place_datas.uid === logInUserProfile?.uid ? "Me" : "🧑‍💻"}
          </Pin>
          :
          <Pin
            background={"pink"}
            borderColor={"#1e89a1"}
            scale={1.3}
          >
            ☕
          </Pin>
        }

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

              <Stack direction="row" justifyContent="center" spacing={1}>
                <IconButton aria-label="chat" onClick={() => navigate('/chat')}>
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
              <hr />

              <Stack direction="row" alignItems="center">
                <HistoryIcon />
                <span className="profile learningDuration" >{place_datas.learningDuration}</span>
              </Stack>
              <Stack direction="row" alignItems="center">
                <CodeIcon />
                {place_datas.programmingLanguages.map((programmingLanguage) => (
                  <span className="profile programmingLanguages" key={programmingLanguage}>{programmingLanguage}</span>
                ))}
              </Stack>
              <Stack direction="row" alignItems="center">
                <LanguageIcon />
                {place_datas.languages.map((language) => (
                  <span className="profile languages" key={language}>{language}</span>
                ))}
              </Stack>
            </Box>
          </InfoWindow>
        )}
      </AdvancedMarker >
    </>
  );
}

export function PlaceMarkerCafe({ place_datas, isOpen, setMarkerPlaceId, markerPlaceId }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [placeInfo, setPlaceInfo] = useState();

  // Once placesLibrary and reactMap is generated, define and trigger placesService
  useEffect(() => {
    if (!placesLib || !map) return;
    setPlacesService(new placesLib.PlacesService(map));
  }, [placesLib, map]);


  // Once placesService is triggered, query and place marker for nearby clinics
  useEffect(() => {
    if (!placesService || !map) {
      console.log("No places service available");
      return;
    }

    const detailsRequest = {
      placeId: markerPlaceId,
      fields: ['photos', 'formatted_address', 'name', 'url'], // Request the name and opening hours fields
    };

    // Query
    placesService.getDetails(detailsRequest, function (results: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) {
      if (status === "OK") {
        const sendPlaceInfo = {
          // photos: results?.photos[0].getUrl(),
          photos: results?.photos.slice(0, 5),
          formatted_address: results?.formatted_address,
          name: results?.name,
          url: results?.url
        }
        setPlaceInfo(sendPlaceInfo);
        // setPlaceInfo((oldPlaceInfo) => [...oldPlaceInfo, sendPlaceInfo]);
      }
    });
  }, [markerPlaceId])
  console.log(placeInfo)
  // }, [placesService])


  return (<>
    <AdvancedMarker
      ref={markerRef}
      onClick={() => setMarkerPlaceId(isOpen ? null : place_datas.place.placeId)}
      position={place_datas.place.position}
      key={place_datas.place.placeId}
      title={"AdvancedMarker that opens an Infowindow when clicked."}
    >
      <Pin
        background={"pink"}
        borderColor={"#1e89a1"}
        scale={1.3}
      >
        ☕
      </Pin>


      {isOpen && (
        <InfoWindow
          anchor={marker}
          minWidth={200}
          onCloseClick={() => setMarkerPlaceId(null)}
        >
          {placeInfo && 
          <>
          <div className="cafeCard-container">
            <div>{placeInfo.name}</div>
            <div>{placeInfo.url}</div>
            <div>{placeInfo.formatted_address}</div>
            {placeInfo.photos.map((photo)=>(
            <img src={photo.getUrl()} key={photo.getUrl()}/>

            ))}
          </div>
          </>
          }
        </InfoWindow>
      )}
    </AdvancedMarker >
  </>)

}
