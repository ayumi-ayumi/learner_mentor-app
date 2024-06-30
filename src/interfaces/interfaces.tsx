import { FieldValue } from "firebase/firestore";
import { ReactNode } from "react";

export interface UserProfileType {
  uid: string,
  id: number,
  timestamp: FieldValue,
  place: Place,
  name: string,
  learnerORmentor: string,
  learningDuration: string,
  workingDuration: string,
  programmingLanguages: string[],
  languages: string[],
  avater: string
}

export interface CafeDetailType {
  // uid: string,
  id: number,
  timestamp: FieldValue,
  place: Place,
  // name: string,
  // learnerORmentor: string,
  // learningDuration: string,
  // workingDuration: string,
  cafe_detail: string[],
  // languages: string[],
}


export interface Place {
  name?: string,
  address: string | undefined,
  position: { lat: LatLng | LatLngLiteral | null | undefined, lng: LatLng | LatLngLiteral | null | undefined }
  // position: { lat: number | undefined, lng: number | undefined }
}


export interface FormInputProps {
  name: string;
  label: string;
  options?: {label:string, value:string}[];
}

export interface Props {
  children?: ReactNode;
}