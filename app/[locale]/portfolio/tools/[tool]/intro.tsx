import {Tool} from '../../../../../lib/tools'
import TechnologyIcon from '../tool-icon'

type TechnologyIntroPageProps = {
  tool: Tool
}

export default function ToolIntroPage({tool}: TechnologyIntroPageProps) {
  return (
    <section className="pb-10 pt-6">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="bg-muted/20 rounded-lg flex flex-col gap-10 pt-4 pb-12 px-4 w-full md:min-w-[300px] max-w-[400px] text-center">
            <div className="text-8xl">
              <TechnologyIcon icon={tool.icon} iconPrefix={tool.iconPrefix} />
            </div>
            <h1 className="text-6xl font-bold leading-2">{tool.name}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl h-fit my-auto whitespace-pre-line">
            {tool.intro}
          </p>
        </div>
      </div>
    </section>
  )
}
