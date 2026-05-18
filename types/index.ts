export interface Project {
  _id?: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
  featured?: boolean;
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  icon?: string;
  features: string[];
}

export interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Testimonial {
  _id?: string;
  author: string;
  company: string;
  content: string;
  image?: string;
  rating?: number;
}
