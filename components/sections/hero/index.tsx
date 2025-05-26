'use client'

import Icon, {type IconName, type IconPrefix} from '@/components/ui/icon'
import {motion, AnimatePresence} from 'framer-motion'
import {useState, useEffect} from 'react'
import IntroHero from './intro'

type IconProps = {
  name: IconName
  prefix?: IconPrefix
}

const devIcons: IconProps[] = [
  {name: 'typescript'},
  {name: 'react'},
  {name: 'git', prefix: 'fab'},
  {name: 'gitlab'},
  {name: 'github', prefix: 'fab'}
]

const opsIcons: IconProps[] = [
  {name: 'ansible'},
  {name: 'salt'},
  {name: 'docker'},
  {name: 'cloud'},
  {name: 'server'}
]

export default function Hero() {
  const [currentScreen, setCurrentScreen] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentScreen(1), 4000)
    const timer2 = setTimeout(() => setCurrentScreen(2), 9000)
    const timer3 = setTimeout(() => setCurrentScreen(3), 16000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const screenVariants = {
    initial: {opacity: 0, scale: 0.8},
    animate: {opacity: 1, scale: 1},
    exit: {opacity: 0, scale: 1.2}
  }

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center container">
      <AnimatePresence mode="wait">
        {/* Dev Screen */}
        {currentScreen === 0 && (
          <motion.div
            key="dev"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 1}}
            className="h-full flex flex-col items-center justify-center z-10">
            <motion.h1
              initial={{opacity: 0, y: 50}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.2}}
              className="text-9xl md:text-[12rem] font-bold text-foreground mb-16">
              Dev
            </motion.h1>

            <div className="flex flex-wrap justify-center gap-16">
              {devIcons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{x: -300, opacity: 0, rotate: -180}}
                  animate={{x: 0, opacity: 1, rotate: 0}}
                  transition={{
                    delay: 1 + index * 0.3,
                    duration: 1,
                    type: 'spring',
                    stiffness: 80
                  }}
                  className="text-6xl md:text-7xl">
                  <Icon name={item.name} prefix={item.prefix} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Ops Screen */}
        {currentScreen === 1 && (
          <motion.div
            key="ops"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 1}}
            className="h-full flex flex-col items-center justify-center z-10">
            <motion.h1
              initial={{opacity: 0, y: 50}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.2}}
              className="text-9xl md:text-[12rem] font-bold text-foreground mb-16">
              Ops
            </motion.h1>

            <div className="flex justify-center gap-16 flex-wrap">
              {opsIcons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{x: 300, opacity: 0, rotate: 180}}
                  animate={{x: 0, opacity: 1, rotate: 0}}
                  transition={{
                    delay: 1 + index * 0.3,
                    duration: 1,
                    type: 'spring',
                    stiffness: 80
                  }}
                  className="text-6xl md:text-7xl">
                  <Icon name={item.name} prefix={item.prefix} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* DevOps Impact Screen */}
        {currentScreen === 2 && (
          <motion.div
            key="devops"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 1}}
            className="h-full flex flex-col items-center justify-center z-10 relative">
            {/* Screen Shake Container */}
            <motion.div
              animate={{
                x: [0, -10, 10, -10, 10, 0],
                y: [0, -5, 5, -5, 5, 0]
              }}
              transition={{
                duration: 0.5,
                delay: 1.5,
                ease: 'easeInOut'
              }}
              className="flex flex-col items-center">
              <motion.h1
                initial={{opacity: 0, scale: 0.1}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 200,
                  damping: 10
                }}
                className="text-9xl md:text-[12rem] font-bold text-foreground mb-16 relative">
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 0px #fff',
                      '0 0 20px #fff, 0 0 30px #fff, 0 0 40px hsl(var(--primary))',
                      '0 0 0px #fff'
                    ]
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 1.5,
                    repeat: 3
                  }}>
                  DevOps
                </motion.span>
              </motion.h1>

              {/* All Icons with Impact Animation */}
              <div className="grid grid-cols-4 gap-8 md:gap-12">
                {[...devIcons, ...opsIcons].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      x: index < 4 ? -400 : 400,
                      y: index % 2 === 0 ? -300 : 300,
                      opacity: 0,
                      rotate: index < 4 ? -360 : 360,
                      scale: 0
                    }}
                    animate={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                      rotate: 0,
                      scale: 1
                    }}
                    transition={{
                      delay: 1 + index * 0.1,
                      duration: 0.8,
                      type: 'spring',
                      stiffness: 150,
                      damping: 8
                    }}
                    className="text-5xl md:text-6xl relative">
                    {/* Bounce Effect */}
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        delay: 1 + index * 0.1 + 0.8,
                        duration: 0.4,
                        ease: 'easeInOut'
                      }}>
                      {/* Impact Ring Effect */}
                      <motion.div
                        initial={{scale: 0, opacity: 0}}
                        animate={{scale: [0, 3, 0], opacity: [0, 0.5, 0]}}
                        transition={{
                          delay: 1 + index * 0.1 + 0.3,
                          duration: 0.6,
                          ease: 'easeOut'
                        }}
                        className="absolute inset-0 border-2 border-foreground rounded-full"
                      />

                      {/* Icon with Glow Effect */}
                      <motion.div
                        animate={{
                          filter: [
                            'drop-shadow(0 0 0px rgba(255,255,255,0))',
                            'drop-shadow(0 0 20px rgba(255,255,255,0.8))',
                            'drop-shadow(0 0 0px rgba(255,255,255,0))'
                          ]
                        }}
                        transition={{
                          delay: 1 + index * 0.1 + 0.5,
                          duration: 0.4,
                          repeat: 2,
                          ease: 'easeInOut'
                        }}>
                        <Icon name={item.name} prefix={item.prefix} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Contact Screen */}
        {currentScreen === 3 && <IntroHero />}
      </AnimatePresence>
    </section>
  )
}
