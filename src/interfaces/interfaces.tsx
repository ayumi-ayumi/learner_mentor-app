import { LearnerORmentor, Options_LearningDuration, Options_WorkingDuration, Options_Langugages, Options_ProgrammingLanguages } from '../types/types'


export interface UserProfile {
  id: number,
  dateTime: Date,
  place: Place,
  name: string,
  learnerORmentor: string,
  LearningDuration: string,
  WorkingDuration: string,
  programmingLanguages: string[],
  languages: string[],
}


export interface Place {
  address: string | undefined,
  position: { lat: number | undefined, lng: number | undefined }
}

export interface FormInputProps {
  name: string;
  label: string;
  options?: {label:string, value:string}[];
}