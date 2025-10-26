import {getTechnology} from '@/lib/technologies'
import {Badge} from './badge'
import Link from 'next/link'

export default function ProjectTechnologyBadge({
  technologyName
}: {
  technologyName: string
}) {
  const technology = getTechnology(technologyName)
  return (
    <>
      {technology?.name ? (
        <Link href={`/portfolio/technologies/${technology.slug}`}>
          <Badge
            variant="outline"
            className="font-normal px-1.5 hover:bg-accent/50">
            {technology.name}
          </Badge>
        </Link>
      ) : (
        <Badge variant="outline" className="font-normal px-1.5 border-muted">
          {technologyName}
        </Badge>
      )}
    </>
  )
}
