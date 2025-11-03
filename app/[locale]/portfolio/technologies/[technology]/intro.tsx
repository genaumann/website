import TechnologyIcon from '../technology-icon'
import {Technology} from '@/lib/types'
import {LocaleParam} from '@/lib/types'

type TechnologyIntroPageProps = LocaleParam & {
  technology: Technology
}

export default function TechnologyIntroPage({
  technology,
  locale
}: TechnologyIntroPageProps) {
  return (
    <section className="pb-10 pt-6">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="bg-muted/20 rounded-lg flex flex-col gap-10 pt-4 pb-12 px-4 w-full md:min-w-[300px] max-w-[400px] text-center">
            <div className="text-8xl">
              <TechnologyIcon
                icon={technology.icon}
                iconPrefix={technology.iconPrefix}
              />
            </div>
            <h1 className="text-6xl font-bold leading-2">{technology.name}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl h-fit my-auto whitespace-pre-line">
            {technology.intro[locale as keyof typeof technology.intro]}
          </p>
        </div>
      </div>
    </section>
  )
}
