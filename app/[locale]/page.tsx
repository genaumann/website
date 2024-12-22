import About from '@/components/sections/about'
import Certs from '@/components/sections/certs'
import Experience from '@/components/sections/experience'
import Hero from '@/components/sections/hero'

export default async function Page() {
  return (
    <>
      <Hero />
      <About />
      <Certs />
      <Experience />
    </>
  )
}
