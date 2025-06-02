import Link from 'next/link'
import type {Tool} from '../../../../lib/tools'
import TechnologyIcon from './tool-icon'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({tool}: ToolCardProps) {
  return (
    <Link
      href={`/portfolio/tools/${tool.slug}`}
      className="flex flex-col items-center rounded-xl shadow text-3xl group focus:outline-none focus:ring-2 focus:ring-primary">
      <div className="py-4 text-7xl transition-transform duration-300 ease-in-out group-hover:scale-150 group-focus:scale-150">
        <TechnologyIcon icon={tool.icon} iconPrefix={tool.iconPrefix} />
      </div>
      <div className="text-center py-2 bg-card w-full rounded-b-xl">
        <span>{tool.name}</span>
      </div>
    </Link>
  )
}
