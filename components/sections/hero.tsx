import {Button} from '../ui/button'
import Link from 'next/link'
import Icon from '../ui/icon'
import {getProjects} from '@/lib/projects'
import {getTrainings} from '@/lib/trainings'
import {certs} from '@/lib/cert'
import {getFlatArticleIndex} from '@/lib/mdx'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {LOCALES} from '@/locales'
import Particles from '../Particles'
import GradientText from '../GradientText'

export default async function Hero() {
  const completedProjects = getProjects().filter(
    project => project.end && project.end < new Date()
  ).length
  const speakerTrainings = getTrainings({
    type: 'speaker'
  }).length
  const kbArticles = await getFlatArticleIndex(LOCALES.de)
  const t = await getTranslate()

  const stats = [
    {
      title: t('completedProjects'),
      value: completedProjects,
      link: '/portfolio/projects'
    },
    {
      title: t('certificates'),
      value: certs.length,
      link: '/portfolio#certs'
    },
    {
      title: t('speakerTrainings'),
      value: speakerTrainings,
      link: '/portfolio#trainings'
    },
    {
      title: t('kbArticles'),
      value: kbArticles.length,
      link: '/kb'
    }
  ]

  return (
    <section className="font-oswald min-h-content-header relative bg-background dark:bg-background flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      <div className="absolute inset-0">
        <Particles
          particleCount={600}
          particleSpread={10}
          speed={0.1}
          particleColors={['#39ff87']}
          moveParticlesOnHover
          particleHoverFactor={1}
          particleBaseSize={60}
          sizeRandomness={0.1}
          cameraDistance={20}
          disableRotation
        />
      </div>

      {/* Main Content: pointer-events-none so mouse moves reach Particles; re-enable for links/buttons */}
      <div className="relative z-10 text-center max-w-6xl mx-auto pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        {/* Title */}
        <h1 className="text-8xl lg:text-9xl font-black mb-8 tracking-tight leading-none">
          <GradientText
            darkColors={['#00ff66', '#ffffff']}
            lightColors={['#00a500', '#000000']}
            animationSpeed={5}
            yoyo={false}
            showBorder={false}>
            {t('appName')}
          </GradientText>
        </h1>

        {/* Description */}
        <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
          {t('intro')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-[197px] mx-auto mb-20">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-4 py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full"
            asChild>
            <Link href="/portfolio">
              {t('viewPortfolio')}
              <Icon name="arrow-right" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-border text-foreground hover:bg-accent hover:text-accent-foreground px-4 py-4 text-lg rounded-lg backdrop-blur-sm w-full"
            asChild>
            <Link href="/kb">
              {t('viewKB')}
              <Icon name="arrow-right" />
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Link
              key={index}
              href={stat.link}
              className="text-center group hover:cursor-pointer">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground leading-tight">
                {stat.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
