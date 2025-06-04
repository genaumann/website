import {useTranslations} from 'next-intl'

export type Project = {
  id: string
  name: string
  description: string
  technologies: string[]
  references?: {label: string; url: string}[]
  start: Date
  end?: Date
}

// const t = useTranslations('portfolio.tools.projects')

interface GetProjectsParams {
  technology?: string
  t: ReturnType<typeof useTranslations>
}

export const getProjects = ({technology, t}: GetProjectsParams): Project[] => {
  const projects: Project[] = [
    {
      id: 'suse-salt-concept',
      name: t('projects.suseSaltConcept.name'),
      description: t('projects.suseSaltConcept.description'),
      technologies: ['salt', 'python', 'suse-manager', 'uyuni', 'git'],
      start: new Date('2023-08-01'),
      end: new Date('2024-09-30')
    },
    {
      id: 'web-app-racetrack',
      name: t('projects.webAppRacetrack.name'),
      description: t('projects.webAppRacetrack.description'),
      technologies: ['react', 'typescript', 'nextjs'],
      start: new Date('2024-10-01'),
      end: new Date('2025-03-31')
    },
    {
      id: 'e2e-testing-playwright',
      name: t('projects.e2eTestingPlaywright.name'),
      description: t('projects.e2eTestingPlaywright.description'),
      technologies: ['playwright', 'typescript', 'nextjs', 'github'],
      start: new Date('2024-10-01')
    },
    {
      id: 'automated-awx-deployment',
      name: t('projects.automatedAwxDeployment.name'),
      description: t('projects.automatedAwxDeployment.description'),
      technologies: ['awx', 'ansible', 'gitlab'],
      start: new Date('2023-08-01'),
      end: new Date('2023-09-30')
    },
    {
      id: 'setup-salt-from-scratch',
      name: t('projects.setupSaltFromScratch.name'),
      description: t('projects.setupSaltFromScratch.description'),
      technologies: ['salt', 'linux', 'git'],
      start: new Date('2020-01-01'),
      end: new Date('2021-08-30')
    },
    {
      id: 'setup-icinga2-from-scratch',
      name: t('projects.setupIcinga2FromScratch.name'),
      description: t('projects.setupIcinga2FromScratch.description'),
      technologies: ['icinga2', 'salt', 'linux'],
      start: new Date('2020-02-01'),
      end: new Date('2020-07-30')
    },
    {
      id: 'migration-nagios-icinga2',
      name: t('projects.migrationNagiosIcinga2.name'),
      description: t('projects.migrationNagiosIcinga2.description'),
      technologies: ['icinga2'],
      start: new Date('2018-07-01'),
      end: new Date('2018-11-30')
    },
    {
      id: 'personal-website',
      name: t('projects.personalWebsite.name'),
      description: t('projects.personalWebsite.description'),
      technologies: ['nextjs', 'typescript', 'react'],
      references: [
        {
          label: t('projects.personalWebsite.ref.github'),
          url: 'https://github.com/genaumann/website'
        }
      ],
      start: new Date('2023-06-01')
    },
    {
      id: 'automated-container-build-gitlab',
      name: t('projects.automatedContainerBuildGitlab.name'),
      description: t('projects.automatedContainerBuildGitlab.description'),
      references: [
        {
          label: t('projects.automatedContainerBuildGitlab.ref.gitlab'),
          url: 'https://gitlab.com/genaumann/cib'
        }
      ],
      technologies: ['gitlab', 'container', 'python'],
      start: new Date('2023-11-01'),
      end: new Date('2024-07-31')
    },
    {
      id: 'ansible-server-concept',
      name: t('projects.ansibleServerConcept.name'),
      description: t('projects.ansibleServerConcept.description'),
      technologies: ['ansible', 'linux'],
      start: new Date('2022-04-01'),
      end: new Date('2022-12-31')
    },
    {
      id: 'salt-formula-git',
      name: t('projects.saltFormulaGit.name'),
      description: t('projects.saltFormulaGit.description'),
      technologies: ['salt', 'git'],
      references: [
        {
          label: t('projects.saltFormulaGit.ref.github'),
          url: 'https://github.com/genaumann/salt-git-formula'
        }
      ],
      start: new Date('2023-12-12'),
      end: new Date('2024-03-31')
    },
    {
      id: 'salt-formula-acmesh',
      name: t('projects.saltFormulaAcmeSh.name'),
      description: t('projects.saltFormulaAcmeSh.description'),
      technologies: ['salt', 'python'],
      references: [
        {
          label: t('projects.saltFormulaAcmeSh.ref.github'),
          url: 'https://github.com/genaumann/salt-acme.sh-formula'
        }
      ],
      start: new Date('2024-01-01'),
      end: new Date('2024-03-31')
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

  return projects.filter(project =>
    project.technologies.some(
      tech => tech.toLowerCase() === technology.toLowerCase()
    )
  )
}
