export type ZoneId =
  | 'accueil'
  | 'experiences'
  | 'projets'
  | 'competences'
  | 'formations'
  | 'contact'

export interface ZoneConfig {
  id: ZoneId
  label: string
  order: number
  /** Radians from the hub, using the car's rotation.y convention (0 = -Z). Unused for accueil. */
  angle: number
}

/**
 * One physical stop along a zone's street — one experience, one project,
 * one skill category, etc. Each stop gets its own building/sign and its
 * own info card, instead of one card listing everything for the zone.
 */
export interface ZoneStop {
  id: string
  zoneId: ZoneId
  index: number
  position: [number, number, number]
  /** Same convention as ZoneConfig.angle — used to orient the stop's decor. */
  angle: number
  triggerRadius: number
  side: 'left' | 'right' | 'center'
}

export interface LanguageSkill {
  name: string
  level: string
}

export interface Profile {
  fullName: string
  title: string
  email: string
  phone?: string
  summary: string
  socials: {
    github: string
    linkedin: string
  }
  languages: LanguageSkill[]
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  missions: string[]
  techStack: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  demoUrl?: string
  githubUrl?: string
}

export interface SkillCategory {
  id: string
  label: string
  skills: string[]
}

export interface EducationEntry {
  id: string
  degree: string
  institution: string
  period: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
}
