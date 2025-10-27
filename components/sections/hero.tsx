import {Button} from '../ui/button'
import Link from 'next/link'
import Icon from '../ui/icon'
import {getProjects} from '@/lib/projects'
import {getTrainings} from '@/lib/trainings'
import {certs} from '@/lib/cert'
import {getFlatArticleIndex} from '@/lib/mdx'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {LOCALES} from '@/locales'

const StarField = () => {
  const stars = Array.from({length: 40}, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 4 + Math.random() * 6,
    size: 0.2 + Math.random() * 0.4, // Much smaller scale factor
    rotation: Math.random() * 360,
    floatX: (Math.random() - 0.5) * 30, // Subtle horizontal movement
    floatY: (Math.random() - 0.5) * 10, // Subtle vertical movement
    floatDuration: 8 + Math.random() * 12 // Slow floating
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute animate-github-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            transform: `scale(${star.size}) rotate(${star.rotation}deg)`
          }}>
          {/* Small 4-pointed star shape */}
          <div
            className="relative w-2 h-2 star-shape animate-float"
            style={
              {
                animationDuration: `${star.floatDuration}s`,
                animationDelay: `${star.delay * 0.5}s`,
                '--float-x': `${star.floatX}px`,
                '--float-y': `${star.floatY}px`
              } as React.CSSProperties & {
                '--float-x': string
                '--float-y': string
              }
            }>
            {/* Vertical beam */}
            <div className="absolute left-1/2 top-0 w-px h-full bg-primary transform -translate-x-1/2 star-beam"></div>
            {/* Horizontal beam */}
            <div className="absolute top-1/2 left-0 h-px w-full bg-primary transform -translate-y-1/2 star-beam"></div>
            {/* Center point */}
            <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 star-center"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-65">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
      </div>

      {/* Small floating StarField */}
      <StarField />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-8xl lg:text-9xl font-black text-foreground mb-8 tracking-tight leading-none animate-flicker">
          {t('appName')}
        </h1>

        {/* Description */}
        <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed font-light">
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

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  )
}
