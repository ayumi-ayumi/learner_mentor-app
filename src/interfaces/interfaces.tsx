import { LearnerORmentor, Options_LearningDuration, Options_WorkingDuration, Options_Langugages, Options_ProgrammingLanguages } from '../types/types'


export interface UserProfile {
  name: string,
  learnerORmentor: string,
  LearningDuration: string,
  WorkingDuration: string,
  programmingLanguages: string[],
  languages: string[],
}
// export interface UserProfile {
//   name: string,
//   learnerORmentor: LearnerORmentor,
//   LearningDuration: Options_LearningDuration,
//   WorkingDuration: Options_WorkingDuration,
//   programmingLanguages: Options_ProgrammingLanguages[],
//   languages: Options_Langugages[],
// }