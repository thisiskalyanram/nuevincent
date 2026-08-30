export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ProjectEnquiry {
  id?: string;
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  location?: string;
  description: string;
  inspirationLink?: string;
  source?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export type ProjectCategory = 
  | 'ALL'
  | 'FILMS'
  | 'ADVERTISING'
  | 'BRANDS'
  | 'PRODUCTS'
  | 'SOCIAL MEDIA'
  | 'POST-PRODUCTION';

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface PortfolioProject {
  id?: string;
  title: string;
  slug: string;
  category: Exclude<ProjectCategory, 'ALL'>;
  year: string;
  duration?: string;
  description: string;
  fullStory?: string;
  client?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  galleryUrls: string[];
  services: string[];
  credits: ProjectCredit[];
  challenge?: string;
  solution?: string;
  featured: boolean;
  createdAt?: string;
}

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  gearAndTech?: string[];
  icon: string;
}
