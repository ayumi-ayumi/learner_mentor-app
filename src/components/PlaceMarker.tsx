import React, { Key, useEffect, useState } from "react";
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary
} from "@vis.gl/react-google-maps";
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LanguageIcon from '@mui/icons-material/Language';
import HistoryIcon from '@mui/icons-material/History';
import CodeIcon from '@mui/icons-material/Code';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CafeDetailType } from "../interfaces/interfaces";
import { useAuth } from "../context/AuthProvider";
import { avaterImgs } from "../Props/props";
import { useNavigate } from "react-router-dom";
import '../styles/PlaceMarker.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Stack, Box, IconButton } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PlaceMarker({ data, isOpen, setMarkerID }: { data: any, isOpen: boolean, setMarkerID: any }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isFav, setIsFav] = useState(false);
  const { logInUserProfile } = useAuth();
  const navigate = useNavigate();


  const showAvaterDescription = (src) => {
    const desc = avaterImgs.filter(img => img.src === src).map(el => el.description).toString()
    return desc
  }

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setMarkerID(isOpen ? null : data.uid)}
        position={data.place.position}
        key={data.uid}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      >
        <Pin
          background={data.learnerORmentor === "Learner" ? "#22ccff" : "yellow"}
          borderColor={"#1e89a1"}
          scale={1.3}
        >
          {data.uid === logInUserProfile?.uid ? "Me" : "🧑‍💻"}
        </Pin>

        {isOpen && (
          <InfoWindow
            anchor={marker}
            minWidth={200}
            onCloseClick={() => setMarkerID(null)}
          // onClose={() => setMarkerID(null)}
          >
            <Box className="card-container">
              <div className="card_upper">
                <div className="card_upper left">
                  <img src={data.avater} className="card_upper left avatar" aria-label={showAvaterDescription(data.avater)} />
                </div>
                <div className="card_upper right">
                  <div className="learnerORmentor">{data.learnerORmentor}</div>
                  <div className="name">{data.name}</div>
                </div>
              </div>

              <Stack direction="row" justifyContent="center" spacing={1}>
                <IconButton aria-label="chat" onClick={() => navigate(`/chat/${data.name}`, { state: { uid: data.uid } })}>
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
                <span className="profile learningDuration" >{data.learningDuration}</span>
              </Stack>
              <Stack direction="row" alignItems="center">
                <CodeIcon />
                {data.programmingLanguages.map((programmingLanguage) => (
                  <span className="profile programmingLanguages" key={programmingLanguage}>{programmingLanguage}</span>
                ))}
              </Stack>
              <Stack direction="row" alignItems="center">
                <LanguageIcon />
                {data.languages.map((language) => (
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

interface PlaceInfoType {
  photos: google.maps.places.PlacePhoto[] | undefined;
  formatted_address: string | undefined;
  name: string | undefined;
  url: string | undefined;
}

export function PlaceMarkerCafe({ data, isOpen, setMarkerID, markerID, markerCafePlaceID }: { data: CafeDetailType, isOpen: boolean, setMarkerID: React.Dispatch<React.SetStateAction<Key | null | undefined>>, markerID: string, markerCafePlaceID: string }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [placeInfo, setPlaceInfo] = useState<PlaceInfoType>();

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
      placeId: markerCafePlaceID,
      fields: ['photos', 'formatted_address', 'name', 'url'], // Request the name and opening hours fields
    };

    // Query
    placesService.getDetails(detailsRequest, function (results: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) {
      if (status === "OK") {
        const sendPlaceInfo = {
          photos: results?.photos?.slice(0, 3),
          formatted_address: results?.formatted_address,
          name: results?.name,
          url: results?.url
        }
        setPlaceInfo(sendPlaceInfo);
      }
    });
  }, [markerID])

  return (<>
    <AdvancedMarker
      ref={markerRef}
      onClick={() => setMarkerID(isOpen ? null : data.place.placeId)}
      position={data.place.position}
      key={data.place.placeId}
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
          onCloseClick={() => setMarkerID(null)}
        // onClose={() => setMarkerID(null)}
        >
          {placeInfo &&
            <>
              <div className="cafeCard-container">
                <div>{placeInfo.name}</div>
                <div><LocationOnIcon />{placeInfo.formatted_address}</div>
                <div>
                  <a href={placeInfo.url} target="_blank" rel="noreferrer">View in Google Maps</a>
                </div>
                <div>
                  {data.cafe_detail.map((detail) => (
                    <span className="cafeProfile" key={detail}>{detail}</span>
                  ))}
                </div>
                {placeInfo.photos?.map((photo) => (
                  <img src={photo.getUrl()} key={photo.getUrl()} />
                ))}
              </div>
            </>
          }
        </InfoWindow>
      )}
    </AdvancedMarker >
  </>)

}
