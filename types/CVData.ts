export default interface CVData {
    contact_info: {
      name: string;
      role:string;
      email: string;
      phone: string;
      linkedin: string;
    };
    description: string;
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
    experience: {
      position: string;
      company: string;
      location: string;
      dates: string;
      bullet_points: string[];
    }[];
    additional_info: {
      hard_skills: string[];
      soft_skills: string[];
      languages: string[];
    };
  }