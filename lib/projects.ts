import {TType} from './types'
import projectIndex from './projectIndex.json'
import {type Project as TProject} from './types'

export type ProjectContext = 'personal' | 'work' | 'freelance'

export type Project = {
  id: string
  name?: string
  description?: string
  technologies: string[]
  references?: {label?: string; url: string}[]
  context: ProjectContext
  start: Date
  end?: Date
}

interface GetProjectsParams {
  technology?: string
  t?: TType
}

type TProjectIndex = Omit<TProject, 'start' | 'end'> & {
  start: string
  end: string
}

export const getProjects = ({
  technology,
  t
}: GetProjectsParams = {}): Project[] => {
  const projects: Project[] = [
    {
      id: 'ai-chatbot',
      name: t && t('projects.aiChatbot.name'),
      description: t && t('projects.aiChatbot.description'),
      technologies: ['ai', 'chatbot', 'nextjs', 'react', 'typescript'],
      start: new Date('2025-08-01'),
      end: new Date('2025-10-07'),
      context: 'freelance' as ProjectContext
    },
    {
      id: 'suse-salt-concept',
      name: t && t('projects.suseSaltConcept.name'),
      description: t && t('projects.suseSaltConcept.description'),
      technologies: ['salt', 'python', 'suse-manager', 'uyuni', 'git'],
      start: new Date('2023-08-01'),
      end: new Date('2024-09-30'),
      context: 'work' as ProjectContext
    },
    {
      id: 'web-app-racetrack',
      name: t && t('projects.webAppRacetrack.name'),
      description: t && t('projects.webAppRacetrack.description'),
      technologies: ['react', 'typescript', 'nextjs'],
      start: new Date('2024-10-01'),
      end: new Date('2025-03-31'),
      context: 'work' as ProjectContext
    },
    {
      id: 'e2e-testing-playwright',
      name: t && t('projects.e2eTestingPlaywright.name'),
      description: t && t('projects.e2eTestingPlaywright.description'),
      technologies: ['playwright', 'typescript', 'nextjs', 'github'],
      start: new Date('2024-10-01'),
      end: new Date('2025-07-31'),
      context: 'work' as ProjectContext
    },
    {
      id: 'gitlab-enablement',
      name: t && t('projects.gitlabEnablement.name'),
      description: t && t('projects.gitlabEnablement.description'),
      technologies: ['gitlab'],
      start: new Date('2024-02-01'),
      end: new Date('2024-09-30'),
      context: 'work' as ProjectContext
    },
    {
      id: 'aap-cluster-setup',
      name: t && t('projects.aapClusterSetup.name'),
      description: t && t('projects.aapClusterSetup.description'),
      technologies: ['ansible', 'awx'],
      start: new Date('2023-12-01'),
      end: new Date('2024-05-31'),
      context: 'work' as ProjectContext
    },
    {
      id: 'automated-awx-deployment',
      name: t && t('projects.automatedAwxDeployment.name'),
      description: t && t('projects.automatedAwxDeployment.description'),
      technologies: ['awx', 'ansible', 'gitlab'],
      start: new Date('2023-08-01'),
      end: new Date('2023-09-30'),
      context: 'work' as ProjectContext
    },
    {
      id: 'setup-salt-from-scratch',
      name: t && t('projects.setupSaltFromScratch.name'),
      description: t && t('projects.setupSaltFromScratch.description'),
      technologies: ['salt', 'linux', 'git'],
      start: new Date('2020-01-01'),
      end: new Date('2021-08-30'),
      context: 'work' as ProjectContext
    },
    {
      id: 'setup-icinga2-from-scratch',
      name: t && t('projects.setupIcinga2FromScratch.name'),
      description: t && t('projects.setupIcinga2FromScratch.description'),
      technologies: ['icinga2', 'salt', 'linux'],
      start: new Date('2020-02-01'),
      end: new Date('2020-07-30'),
      context: 'work' as ProjectContext
    },
    {
      id: 'migration-nagios-icinga2',
      name: t && t('projects.migrationNagiosIcinga2.name'),
      description: t && t('projects.migrationNagiosIcinga2.description'),
      technologies: ['icinga2'],
      start: new Date('2018-07-01'),
      end: new Date('2018-11-30'),
      context: 'work' as ProjectContext
    },
    {
      id: 'personal-website',
      name: t && t('projects.personalWebsite.name'),
      description: t && t('projects.personalWebsite.description'),
      technologies: ['nextjs', 'typescript', 'react'],
      references: [
        {
          label: t && t('github', {ns: 'common'}),
          url: 'https://github.com/genaumann/website'
        }
      ],
      start: new Date('2023-06-01'),
      context: 'personal' as ProjectContext
    },
    {
      id: 'automated-container-build-gitlab',
      name: t && t('projects.automatedContainerBuildGitlab.name'),
      description: t && t('projects.automatedContainerBuildGitlab.description'),
      references: [
        {
          label: t && t('gitlab', {ns: 'common'}),
          url: 'https://gitlab.com/genaumann/cib'
        }
      ],
      technologies: ['gitlab', 'container', 'python'],
      start: new Date('2023-11-01'),
      end: new Date('2024-07-31'),
      context: 'personal' as ProjectContext
    },
    {
      id: 'ansible-server-concept',
      name: t && t('projects.ansibleServerConcept.name'),
      description: t && t('projects.ansibleServerConcept.description'),
      technologies: ['ansible', 'linux'],
      start: new Date('2022-04-01'),
      end: new Date('2022-12-31'),
      context: 'work' as ProjectContext
    },
    {
      id: 'salt-formula-git',
      name: t && t('projects.saltFormulaGit.name'),
      description: t && t('projects.saltFormulaGit.description'),
      technologies: ['salt', 'git'],
      references: [
        {
          label: t && t('github', {ns: 'common'}),
          url: 'https://github.com/genaumann/salt-git-formula'
        }
      ],
      start: new Date('2023-12-12'),
      end: new Date('2024-03-31'),
      context: 'personal' as ProjectContext
    },
    {
      id: 'salt-formula-acmesh',
      name: t && t('projects.saltFormulaAcmeSh.name'),
      description: t && t('projects.saltFormulaAcmeSh.description'),
      technologies: ['salt', 'python'],
      references: [
        {
          label: t && t('github', {ns: 'common'}),
          url: 'https://github.com/genaumann/salt-acme.sh-formula'
        }
      ],
      start: new Date('2024-01-01'),
      end: new Date('2024-03-31'),
      context: 'personal' as ProjectContext
    }
  ].sort((a, b) => {
    if (!a.end && !b.end) return 0
    if (!a.end) return -1
    if (!b.end) return 1

    if (a.end > b.end) return -1
    if (a.end < b.end) return 1
    return 0
  })

  if (!technology) return projects

  return projects.filter(project => project.technologies.includes(technology))
}

const mapProject = (project: TProjectIndex): TProject => {
  return {
    ...project,
    start: new Date(project.start),
    end: project.end ? new Date(project.end) : undefined
  }
}

export const getProject = ({
  id
}: {
  id: TProject['id']
}): TProject | undefined => {
  const project = (projectIndex as Record<string, TProjectIndex>)[id]
  return project ? mapProject(project) : undefined
}
