import type { Certification, EducationEntry } from './types'

export const education: EducationEntry[] = [
  {
    id: 'ingenieur-big-data',
    degree: 'Diplôme d\'Ingénieur en Big Data & Data Science',
    institution: 'Université Internationale de Casablanca',
    period: '2022 – 2025',
  },
  {
    id: 'classes-prepa',
    degree: 'Classes Préparatoires',
    institution: 'Université Internationale de Casablanca',
    period: '2020 – 2022',
  },
]

export const certifications: Certification[] = [
  { id: 'ai-engineer-datacamp', title: 'AI Engineer for Data Scientists Associate', issuer: 'DataCamp' },
  { id: 'data-engineer-datacamp', title: 'Data Engineer', issuer: 'DataCamp' },
]
