import type {
  DeveloperProfile,
  TechItem,
  ExperienceItem,
  Project,
  Comment,
} from '../types'

const projectImages: Record<string, string> = {
  neuralcode:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsYWNrfDE3NzMwOTg3NTR8MA&ixlib=rb-4.1.0&q=85&w=800',
  syncspace:
    'https://images.unsplash.com/photo-1510906594845-bc082582c8cc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsYWNrfDE3NzMwOTg3NTR8MA&ixlib=rb-4.1.0&q=85&w=800',
  prismaui:
    'https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsYWNrfDE3NzMwOTg3NTR8MA&ixlib=rb-4.1.0&q=85&w=800',
  flowmetrics:
    'https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxjb2RlJTIwcHJvZ3JhbW1pbmd8ZW58MHx8fGJsYWNrfDE3NzMwOTg3NTd8MA&ixlib=rb-4.1.0&q=85&w=800',
  shipcli:
    'https://images.unsplash.com/photo-1653387141060-9a9834f47777?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxjb2RlJTIwcHJvZ3JhbW1pbmd8ZW58MHx8fGJsYWNrfDE3NzMwOTg3NTd8MA&ixlib=rb-4.1.0&q=85&w=800',
  marketplace:
    'https://images.unsplash.com/photo-1653387300291-bfa1eeb90e16?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHw0fHxjb2RlJTIwcHJvZ3JhbW1pbmd8ZW58MHx8fGJsYWNrfDE3NzMwOTg3NTd8MA&ixlib=rb-4.1.0&q=85&w=800',
}

export const developerProfile: DeveloperProfile = {
  name: 'J.Phillipe Fernandes',
  title: 'Full Stack Engineer',
  tagline: 'Building elegant solutions to complex problems',
  bio: 'Passionate full-stack engineer with 2+ years of experience crafting high-performance applications. I specialize in React, Node.js, and cloud architecture. I love turning ideas into reality and am always eager to learn new technologies.',
  location: 'Salvador, BA, Brazil',
  email: 'fernandesjoaophillipe@gmail.com',
  yearsOfExperience: 2,
  projectsCompleted: 15,
  githubContributions: 7,
  socialLinks: {
    github: 'https://github.com/jphillipe',
    linkedin: 'https://linkedin.com/in/jphillipefernandes/',
  },
}

export const techStack: TechItem[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Language' },
  { name: 'Go', category: 'Language' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Redis', category: 'Cache' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'GraphQL', category: 'API' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'FastAPI', category: 'Backend' },
]

export const experience: ExperienceItem[] = [
  {
    title: 'Senior Full Stack Engineer',
    company: 'Vercel',
    period: '2022 - Present',
    description:
      'Leading development of internal deployment tools and edge infrastructure. Shipped features used by 100k+ developers.',
  },
  {
    title: 'Full Stack Engineer',
    company: 'Stripe',
    period: '2020 - 2022',
    description:
      'Built payment processing dashboards and developer APIs. Improved checkout conversion by 15%.',
  },
  {
    title: 'Frontend Engineer',
    company: 'GitHub',
    period: '2019 - 2020',
    description:
      'Contributed to GitHub Actions UI and repository management features. Worked on accessibility improvements.',
  },
  {
    title: 'Junior Developer',
    company: 'Startup Lab',
    period: '2018 - 2019',
    description:
      'Full-stack development for early-stage startups. Built MVPs for 3 companies that secured Series A funding.',
  },
]

export const categories: string[] = [
  'All',
  'AI',
  'Frontend',
  'Full Stack',
  'DevOps',
]

export const projects: Project[] = [
  {
    id: '1',
    slug: 'neuralcode-ai',
    title: 'NeuralCode AI',
    shortDescription:
      'AI-powered code review and refactoring assistant that analyzes codebases and provides intelligent suggestions.',
    fullDescription:
      'NeuralCode AI leverages large language models to perform automated code reviews, identify bugs, suggest refactoring, and generate documentation. Integrates directly into CI/CD pipelines.',
    techStack: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    thumbnail: projectImages.neuralcode,
    images: [
      projectImages.neuralcode,
      projectImages.flowmetrics,
      projectImages.shipcli,
    ],
    featured: true,
    year: 2024,
    category: 'AI',
    views: 3842,
    likes: 247,
    stars: 128,
    problem:
      'Code reviews are time-consuming and inconsistent, often missing critical issues while focusing on style preferences.',
    features: [
      'Automated code analysis with ML-powered suggestions',
      'Real-time refactoring recommendations',
      'CI/CD pipeline integration',
      'Multi-language support',
      'Custom rule engine',
      'Code quality metrics dashboard',
    ],
    architecture:
      'Microservices architecture with React frontend, FastAPI backend, and TensorFlow ML pipeline. Async analysis via Celery workers with Redis caching.',
    comments: [
      {
        id: 'c1',
        author: 'Sarah Kim',
        text: 'Integrated it into our CI pipeline \u2014 caught 3 critical bugs in the first week.',
        date: '2024-03-15',
      },
      {
        id: 'c2',
        author: 'Marcus Johnson',
        text: 'The refactoring suggestions are surprisingly accurate. Much better than other AI tools.',
        date: '2024-02-28',
      },
    ],
  },
  {
    id: '2',
    slug: 'syncspace',
    title: 'SyncSpace',
    shortDescription:
      'Real-time collaboration platform with shared workspaces, live cursors, and instant document syncing.',
    fullDescription:
      'SyncSpace enables teams to collaborate in real-time with shared workspaces, live cursors, presence indicators, and conflict-free document editing using CRDTs.',
    techStack: ['React', 'Node.js', 'WebSocket', 'Redis', 'TypeScript'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    thumbnail: projectImages.syncspace,
    images: [projectImages.syncspace, projectImages.neuralcode],
    featured: true,
    year: 2024,
    category: 'Full Stack',
    views: 2156,
    likes: 183,
    stars: 94,
    problem:
      'Existing collaboration tools suffer from sync delays and conflict resolution issues, breaking team flow.',
    features: [
      'Real-time document syncing with CRDTs',
      'Live cursors and presence indicators',
      'Shared workspaces with role-based access',
      'Offline mode with automatic reconciliation',
      'Version history and rollback',
    ],
    architecture:
      'Event-driven architecture using WebSockets for real-time communication. CRDT-based conflict resolution with Redis pub/sub for horizontal scaling.',
    comments: [
      {
        id: 'c3',
        author: 'Emily Davis',
        text: 'Finally a collaboration tool that actually feels real-time. No more lag!',
        date: '2024-01-20',
      },
    ],
  },
  {
    id: '3',
    slug: 'prisma-ui-kit',
    title: 'Prisma UI Kit',
    shortDescription:
      'A comprehensive design system with 50+ accessible components built for modern React applications.',
    fullDescription:
      'Prisma UI Kit is a production-ready component library featuring 50+ accessible components, dark mode support, and a flexible theming engine.',
    techStack: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    thumbnail: projectImages.prismaui,
    images: [projectImages.prismaui, projectImages.syncspace],
    featured: true,
    year: 2023,
    category: 'Frontend',
    views: 5621,
    likes: 412,
    stars: 267,
    problem:
      'Teams waste weeks building component libraries from scratch. Existing solutions lack flexibility and accessibility.',
    features: [
      '50+ accessible components',
      'Dark mode support',
      'Flexible theming engine',
      'Comprehensive Storybook documentation',
      'Tree-shakeable exports',
      'TypeScript-first approach',
    ],
    architecture:
      'Monorepo with Turborepo. Each component is independently publishable with full TypeScript support and automated visual regression testing.',
    comments: [
      {
        id: 'c4',
        author: 'Jake Wilson',
        text: "Best component library I've used. The theming system is incredibly flexible.",
        date: '2023-11-10',
      },
      {
        id: 'c5',
        author: 'Ava Martinez',
        text: 'Accessibility out of the box \u2014 our audit passed with flying colors.',
        date: '2023-10-05',
      },
    ],
  },
  {
    id: '4',
    slug: 'flowmetrics',
    title: 'FlowMetrics',
    shortDescription:
      'API analytics dashboard with real-time monitoring, anomaly detection, and intelligent alerting.',
    fullDescription:
      'FlowMetrics provides deep insights into API performance with real-time monitoring dashboards, ML-powered anomaly detection, and customizable alerting rules.',
    techStack: ['Next.js', 'Go', 'PostgreSQL', 'Grafana', 'Docker'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    thumbnail: projectImages.flowmetrics,
    images: [projectImages.flowmetrics, projectImages.marketplace],
    featured: true,
    year: 2023,
    category: 'Full Stack',
    views: 1893,
    likes: 156,
    stars: 87,
    problem:
      'API monitoring tools are either too complex or too simple. Teams need actionable insights, not just raw metrics.',
    features: [
      'Real-time API performance dashboards',
      'ML-powered anomaly detection',
      'Custom alerting rules',
      'Request tracing and debugging',
      'Team collaboration features',
    ],
    architecture:
      'Go backend for high-throughput data ingestion. Next.js frontend with server-side rendering. Time-series data stored in PostgreSQL with TimescaleDB extension.',
    comments: [],
  },
  {
    id: '5',
    slug: 'shipcli',
    title: 'ShipCLI',
    shortDescription:
      'Developer CLI tool for streamlined deployment workflows with zero-config setups and rollback support.',
    fullDescription:
      'ShipCLI simplifies deployment workflows with intelligent project detection, zero-config setups, one-command deployments, and instant rollback capabilities.',
    techStack: ['Go', 'Docker', 'Kubernetes', 'GitHub Actions'],
    githubUrl: 'https://github.com',
    liveUrl: '',
    thumbnail: projectImages.shipcli,
    images: [projectImages.shipcli, projectImages.neuralcode],
    featured: false,
    year: 2023,
    category: 'DevOps',
    views: 982,
    likes: 89,
    stars: 156,
    problem:
      'Deployment configurations are repetitive and error-prone. Developers spend too much time on DevOps instead of shipping features.',
    features: [
      'Intelligent project detection',
      'Zero-config deployments',
      'Instant rollback',
      'Multi-cloud support',
      'GitHub Actions integration',
      'Deployment previews',
    ],
    architecture:
      'Built in Go for cross-platform distribution. Uses Docker SDK for containerization and Kubernetes client-go for orchestration.',
    comments: [
      {
        id: 'c6',
        author: 'Tom Richards',
        text: 'Replaced our entire deployment script with one ShipCLI command. Game changer.',
        date: '2023-08-15',
      },
    ],
  },
  {
    id: '6',
    slug: 'marketplace-pro',
    title: 'Marketplace Pro',
    shortDescription:
      'Full-featured e-commerce platform with multi-vendor support, payment processing, and analytics.',
    fullDescription:
      'Marketplace Pro is a scalable e-commerce platform supporting multiple vendors, Stripe payment processing, inventory management, and comprehensive analytics dashboards.',
    techStack: ['Next.js', 'Node.js', 'Stripe', 'MongoDB', 'AWS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    thumbnail: projectImages.marketplace,
    images: [projectImages.marketplace, projectImages.prismaui],
    featured: false,
    year: 2022,
    category: 'Full Stack',
    views: 1247,
    likes: 134,
    stars: 72,
    problem:
      'Building a marketplace from scratch requires months of development. Existing platforms lack customization and charge excessive fees.',
    features: [
      'Multi-vendor support',
      'Stripe payment integration',
      'Inventory management',
      'Analytics dashboard',
      'Search and filtering',
      'Order tracking system',
    ],
    architecture:
      'Next.js with ISR for product pages. Node.js API layer with MongoDB for flexible data modeling. AWS S3 for media storage and CloudFront CDN.',
    comments: [],
  },
]

// --- LocalStorage Helpers ---
const PROJECTS_KEY = 'devfolio_projects'
const LIKES_KEY = 'devfolio_user_likes'
const COMMENTS_KEY = 'devfolio_comments'
const VIEWS_KEY = 'devfolio_views'

export const initializeStorage = (): void => {
  if (typeof window === 'undefined') return
  if (!localStorage.getItem(PROJECTS_KEY)) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
  }
  if (!localStorage.getItem(COMMENTS_KEY)) {
    const commentsMap: Record<string, Comment[]> = {}
    projects.forEach((p) => {
      if (p.comments && p.comments.length > 0) {
        commentsMap[p.id] = p.comments
      }
    })
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(commentsMap))
  }
}

export const getStoredProjects = (): Project[] => {
  if (typeof window === 'undefined') return [...projects]
  const stored = localStorage.getItem(PROJECTS_KEY)
  if (!stored) {
    initializeStorage()
    return [...projects]
  }
  return JSON.parse(stored)
}

export const saveProjectToStorage = (project: Project): Project[] => {
  const allProjects = getStoredProjects()
  const idx = allProjects.findIndex((p) => p.id === project.id)
  if (idx >= 0) {
    allProjects[idx] = project
  } else {
    allProjects.push(project)
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
  }
  return allProjects
}

export const deleteProjectFromStorage = (id: string): Project[] => {
  const allProjects = getStoredProjects().filter((p) => p.id !== id)
  if (typeof window !== 'undefined') {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
  }
  return allProjects
}

export const toggleLike = (projectId: string): string[] => {
  if (typeof window === 'undefined') return []
  const likes: string[] = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]')
  const idx = likes.indexOf(projectId)
  if (idx >= 0) {
    likes.splice(idx, 1)
  } else {
    likes.push(projectId)
  }
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes))
  return likes
}

export const isLiked = (projectId: string): boolean => {
  if (typeof window === 'undefined') return false
  const likes: string[] = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]')
  return likes.includes(projectId)
}

export const getComments = (projectId: string): Comment[] => {
  if (typeof window === 'undefined') return []
  const comments: Record<string, Comment[]> = JSON.parse(
    localStorage.getItem(COMMENTS_KEY) || '{}',
  )
  return comments[projectId] || []
}

export const addComment = (projectId: string, comment: Comment): Comment[] => {
  if (typeof window === 'undefined') return []
  const comments: Record<string, Comment[]> = JSON.parse(
    localStorage.getItem(COMMENTS_KEY) || '{}',
  )
  if (!comments[projectId]) comments[projectId] = []
  comments[projectId].unshift(comment)
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
  return comments[projectId]
}

export const incrementViews = (projectId: string): number => {
  if (typeof window === 'undefined') return 0
  const views: Record<string, number> = JSON.parse(
    localStorage.getItem(VIEWS_KEY) || '{}',
  )
  views[projectId] = (views[projectId] || 0) + 1
  localStorage.setItem(VIEWS_KEY, JSON.stringify(views))
  return views[projectId]
}

export const getExtraViews = (projectId: string): number => {
  if (typeof window === 'undefined') return 0
  const views: Record<string, number> = JSON.parse(
    localStorage.getItem(VIEWS_KEY) || '{}',
  )
  return views[projectId] || 0
}
