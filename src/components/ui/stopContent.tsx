import type { ReactNode } from 'react'
import type { ZoneStop } from '@/data/types'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { certifications } from '@/data/education'
import { experiencesChrono, educationChrono } from '@/data/stops'

interface StopContent {
  title: string
  body: ReactNode
}

/**
 * Resolves a single stop (one experience, one project, one skill
 * category, ...) to the card content it should show. Each zone's items
 * are indexed in the same chronological/array order used to lay out
 * that street's stops in data/stops.ts.
 */
export function getStopContent(stop: ZoneStop): StopContent {
  switch (stop.zoneId) {
    case 'accueil':
      return {
        title: profile.fullName,
        body: (
          <div className="space-y-2">
            <p className="font-medium text-amber-300">{profile.title}</p>
            <p>{profile.summary}</p>
            <ul className="flex flex-wrap gap-2 pt-1">
              {profile.languages.map((lang) => (
                <li key={lang.name} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  {lang.name} — {lang.level}
                </li>
              ))}
            </ul>
          </div>
        ),
      }

    case 'experiences': {
      const exp = experiencesChrono[stop.index]
      if (!exp) return { title: 'Expériences', body: null }
      return {
        title: exp.company,
        body: (
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium text-neutral-100">{exp.role}</span>
              <span className="text-xs whitespace-nowrap text-neutral-400">{exp.period}</span>
            </div>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-neutral-300">
              {exp.missions.map((mission) => (
                <li key={mission}>{mission}</li>
              ))}
            </ul>
            <p className="mt-1 text-xs text-neutral-500">{exp.techStack.join(' · ')}</p>
          </div>
        ),
      }
    }

    case 'projets': {
      const project = projects[stop.index]
      if (!project) return { title: 'Projets', body: null }
      return {
        title: project.title,
        body: (
          <div>
            <p className="text-xs text-neutral-300">{project.description}</p>
            <p className="mt-1 text-xs text-neutral-500">{project.techStack.join(' · ')}</p>
            {(project.githubUrl || project.demoUrl) && (
              <div className="pointer-events-auto mt-1 flex gap-3 text-xs">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-amber-300 underline">
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-amber-300 underline">
                    Démo
                  </a>
                )}
              </div>
            )}
          </div>
        ),
      }
    }

    case 'competences': {
      const category = skillCategories[stop.index]
      if (!category) return { title: 'Compétences', body: null }
      return {
        title: category.label,
        body: (
          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px]">
                {skill}
              </span>
            ))}
          </div>
        ),
      }
    }

    case 'formations': {
      if (stop.index < educationChrono.length) {
        const entry = educationChrono[stop.index]
        if (!entry) return { title: 'Formations', body: null }
        return {
          title: entry.degree,
          body: (
            <p className="text-xs text-neutral-400">
              {entry.institution} · {entry.period}
            </p>
          ),
        }
      }
      const cert = certifications[stop.index - educationChrono.length]
      if (!cert) return { title: 'Formations', body: null }
      return {
        title: cert.title,
        body: <p className="text-xs text-neutral-400">Certification · {cert.issuer}</p>,
      }
    }

    case 'contact':
      return {
        title: 'Contact',
        body: (
          <div className="pointer-events-auto space-y-2 text-xs">
            <a href={`mailto:${profile.email}`} className="block text-amber-300 underline">
              {profile.email}
            </a>
            {profile.phone && <p>{profile.phone}</p>}
            <div className="flex gap-3 pt-1">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-amber-300 underline">
                GitHub
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-amber-300 underline">
                LinkedIn
              </a>
            </div>
          </div>
        ),
      }
  }
}
