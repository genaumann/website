import projectIndex from './projectIndex.json'
import {type Project} from './types'

export type ProjectContext = 'personal' | 'work' | 'freelance'

type TProjectIndex = Omit<Project, 'start' | 'end'> & {
  start: string
  end: string
}

const mapProject = (project: TProjectIndex): Project => {
  return {
    ...project,
    start: new Date(project.start),
    end: project.end ? new Date(project.end) : undefined
  }
}

export const getProject = ({id}: {id: Project['id']}): Project | undefined => {
  const project = (projectIndex as Record<string, TProjectIndex>)[id]
  return project ? mapProject(project) : undefined
}

export const getProjects = (): Project[] => {
  const projectsRecord = projectIndex as Record<string, TProjectIndex>
  return Object.values(projectsRecord).map(mapProject)
}
