export interface DeveloperProfile {
  name: string
  title: string
  tagline: string
  bio: string
  location: string
  email: string
  yearsOfExperience: number
  projectsCompleted: number
  githubContributions: number
  socialLinks: {
    github: string
    linkedin: string
  }
}

export interface TechItem {
  name: string
  category: string
}

export interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
}

export interface Comment {
  id: string
  author: string
  text: string
  date: string
}

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  techStack: string[]
  githubUrl: string
  liveUrl: string
  thumbnail: string
  images: string[]
  featured: boolean
  year: number
  category: string
  views: number
  likes: number
  stars: number
  problem: string
  features: string[]
  architecture: string
  comments: Comment[]
}

export interface ProjectFormData {
  title: string
  shortDescription: string
  fullDescription: string
  techStackStr: string
  githubUrl: string
  liveUrl: string
  thumbnail: string
  category: string
  year: string
  featured: boolean
  problem: string
  featuresStr: string
  architecture: string
}
