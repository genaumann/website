export interface CertItem {
  name: string
  issuer: string
  validFrom: Date
  validTo?: Date
  url: string
  technologies?: string[]
}

export const certs: CertItem[] = [
  {
    name: 'Red Hat® Certified Engineer (RHCE®)',
    issuer: 'Red Hat',
    validFrom: new Date('2024-08-20'),
    validTo: new Date('2027-08-20'),
    url: 'https://www.credly.com/badges/3b27b7ab-ce1e-4422-bf13-315504ef0e97',
    technologies: ['ansible', 'linux']
  },
  {
    name: 'Red Hat® Certified Specialist in Developing Automation with Ansible Automation Platform',
    issuer: 'Red Hat',
    validFrom: new Date('2024-02-13'),
    validTo: new Date('2027-08-20'),
    url: 'https://www.credly.com/badges/402af3ea-19c6-422f-86a6-3dbc7446bddc',
    technologies: ['ansible', 'linux', 'podman', 'awx']
  },
  {
    name: 'ITIL® Foundation Certificate in IT Service Management',
    issuer: 'PeopleCert',
    validFrom: new Date('2023-11-16'),
    validTo: new Date('2026-11-16'),
    url: 'https://1cmveknpo9tw95o5.public.blob.vercel-storage.com/web/2023-11-16_ITIL-VYSnIkctGNhGTwIBvVHN0GiTeqwttc.pdf',
    technologies: ['itil', 'service-management']
  },
  {
    name: 'Professional Scrum Master™ I (PSM I)',
    issuer: 'Scrum.org',
    validFrom: new Date('2023-06-20'),
    url: 'https://www.credly.com/badges/3f9e550f-a9be-4ed2-973e-543480ff1902',
    technologies: ['scrum', 'agile', 'project management']
  },
  {
    name: 'Red Hat® Certified System Administrator (RHCSA®)',
    issuer: 'Red Hat',
    validFrom: new Date('2023-06-08'),
    validTo: new Date('2027-08-20'),
    url: 'https://www.credly.com/badges/f2d2d2a5-fa70-473f-840b-9eccfb85fa04',
    technologies: ['ansible', 'linux']
  },
  {
    name: 'GitLab Solutions Architect Core Verified Associate',
    issuer: 'GitLab',
    validFrom: new Date('2024-05-27'),
    url: 'https://www.credly.com/badges/2df72c4a-ac11-40aa-90fd-27efa7f5cf50',
    technologies: ['gitlab']
  }
]

export const getCertsByTechnology = (technology: string): CertItem[] => {
  return certs.filter(cert =>
    cert.technologies?.some(t => t.toLowerCase() === technology.toLowerCase())
  )
}
