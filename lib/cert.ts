import {IconName, IconPrefix} from '@/components/ui/icon'

export interface CertItem {
  name: string
  issuer: string
  validFrom: Date
  validTo?: Date
  url: string
  icon?: IconName
  iconPrefix?: IconPrefix
  className?: string
  keywords?: string[]
}

export const certs: CertItem[] = [
  {
    name: 'Red Hat® Certified Specialist in Developing Automation with Ansible Automation Platform',
    issuer: 'Red Hat',
    validFrom: new Date('2024-02-13'),
    validTo: new Date('2027-02-13'),
    url: 'https://www.credly.com/badges/402af3ea-19c6-422f-86a6-3dbc7446bddc',
    icon: 'redhat',
    className: 'text-8xl py-4',
    keywords: ['ansible', 'redhat', 'linux']
  },
  {
    name: 'ITIL® Foundation Certificate in IT Service Management',
    issuer: 'PeopleCert',
    validFrom: new Date('2023-11-16'),
    validTo: new Date('2026-11-16'),
    url: 'https://media.licdn.com/dms/image/v2/D4E2DAQFmagSGx06QQA/profile-treasury-document-images_1920/profile-treasury-document-images_1920/1/1700224345747?e=1734566400&v=beta&t=C7lIIO0Km9bxrHK-wwwiE8cukTHq5Ma8QTE5F0kZyt0',
    keywords: ['itil', 'service-management']
  },
  {
    name: 'Professional Scrum Master™ I (PSM I)',
    issuer: 'Scrum.org',
    validFrom: new Date('2023-06-20'),
    url: 'https://www.credly.com/badges/3f9e550f-a9be-4ed2-973e-543480ff1902',
    keywords: ['scrum', 'agile', 'project management']
  },
  {
    name: 'Red Hat® Certified System Administrator (RHCSA®)',
    issuer: 'Red Hat',
    validFrom: new Date('2023-06-08'),
    validTo: new Date('2027-02-13'),
    icon: 'redhat',
    url: 'https://www.credly.com/badges/f2d2d2a5-fa70-473f-840b-9eccfb85fa04',
    className: 'text-8xl py-4',
    keywords: ['redhat', 'linux']
  }
]

export const getCertsByKeyword = (keyword: string): CertItem[] => {
  return certs.filter(cert =>
    cert.keywords?.some(k => k.toLowerCase() === keyword.toLowerCase())
  )
}
