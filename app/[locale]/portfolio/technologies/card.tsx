import Link from 'next/link'
import TechnologyIcon from './technology-icon'
import {Technology} from '@/lib/types'

interface TechnologyCardProps {
  technology: Technology
}

export default function TechnologyCard({technology}: TechnologyCardProps) {
  return (
    <Link
      href={`/portfolio/technologies/${technology.slug}`}
      className="flex flex-col items-center rounded-lg border border-border shadow dark:shadow-primary text-3xl group focus:outline-none focus:ring-2 focus:ring-primary">
      <div className="py-4 text-7xl transition-transform duration-300 ease-in-out group-hover:scale-150 group-focus:scale-150">
        <TechnologyIcon
          icon={technology.icon}
          iconPrefix={technology.iconPrefix}
        />
      </div>
      <div className="font-oswald text-center py-2 bg-card w-full rounded-b-lg">
        <span>{technology.name}</span>
      </div>
    </Link>
  )
}
