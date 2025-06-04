import Icon from '@/components/ui/icon'
import {CONTACT} from '@/lib/contact'
import Image from 'next/image'
import Link from 'next/link'

export default function PortfolioIntroPage() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <Image
              alt="Gino"
              src={'/me-white.png'}
              width={250}
              height={229}
              className="dark:hidden rounded-full border border-primary"
            />
            <Image
              alt="Gino"
              src={'/me-black.png'}
              width={250}
              height={229}
              className="hidden dark:block rounded-full border border-primary"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground animate-flicker">
              {CONTACT.name}
            </h1>
            <p className="text-3xl text-muted-foreground">{CONTACT.jobTitle}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="location-pin" />
              {CONTACT.location}
            </div>
            <Link
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 underline">
              <Icon name="envelope" />
              {CONTACT.email}
            </Link>
            <Link
              href={`tel:${CONTACT.phone.replaceAll(' ', '')}`}
              className="flex items-center gap-2 underline">
              <Icon name="phone" />
              {CONTACT.phone}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
