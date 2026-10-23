export type PortfolioStatus = "available" | "busy" | "unavailable";
export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type PortfolioWorkItem = {
  title: string;
  description: string;
};

export type PortfolioExperience = {
  startDate: string;
  endDate: string;
  company: string;
  jobTitle: string;
  location: string;
  description: string;
};

export type PortfolioSkill = {
  name: string;
  level: SkillLevel;
};

export type PortfolioProfileValues = {
  subTitle: string;
  title: string;
  description: string;
  aboutTitle: string;
  aboutDescription: string;
  email: string;
  phone: string;
  status: PortfolioStatus;
  location: string;
  yearsOfExperience: number;
  workItems: PortfolioWorkItem[];
  experiences: PortfolioExperience[];
  skills: PortfolioSkill[];
};

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type PortfolioProfileRow = {
  id: number;
  welcome_message: string;
  title: string;
  description: string;
  about_title: string;
  about_description: string;
  email: string;
  phone: string;
  status: PortfolioStatus;
  location: string;
  years_of_experience: number;
  work_items: Json;
  experiences: Json;
  skills: Json;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      portfolio_profiles: {
        Row: PortfolioProfileRow;
        Insert: Omit<PortfolioProfileRow, "created_at" | "updated_at"> &
          Partial<Pick<PortfolioProfileRow, "created_at" | "updated_at">>;
        Update: Partial<PortfolioProfileRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
