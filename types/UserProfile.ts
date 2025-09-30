export interface UserProfile {
  photoURL: string | null;
  name: string;
  shortDescription: string;
  softSkills: string;
  hardSkills: string;
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: { institution: string; degree: string; year: string }[];
  languages: string
  mail: string
  phone: string
  
}

export const defaultUserProfile: UserProfile = {
  name: "",
  shortDescription: "",
  softSkills: "",
  hardSkills: "",
  experience: [],
  education: [],
  photoURL: "",
  languages: "",
  mail:"",
  phone:""
};
