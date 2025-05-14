'use client'

import {useState, useEffect} from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {
  atomDark,
  ghcolors
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import AnimatedTitle from '../ui/animated-title'
import {useTheme} from 'next-themes'

export default function Hero() {
  const [text, setText] = useState('')
  const {theme, systemTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  const fullText = `const developer: Developer = {
  name: 'Gino Naumann',
  core_skills: ['Salt', 'git', 'GitLab', 'TypeScript'],
  passions: ['Motorcycles', 'Beer', 'Coding'],
  contact: () => {
    return 'job@gnaumann.de'
  }
}`

  useEffect(() => {
    setMounted(true)
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 30)

    return () => clearInterval(typingEffect)
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme
  const syntaxStyle = currentTheme === 'dark' ? atomDark : ghcolors

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center container">
      <AnimatedTitle text="Gino Naumann" className="mb-7 text-6xl" />
      <div className="w-full max-w-4xl bg-background rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-center space-x-2 px-4 py-2 bg-card">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-muted-foreground text-sm font-mono ml-2">
            gnaumann_dev.ts
          </span>
        </div>
        <div className="p-4 sm:p-6">
          {mounted ? (
            <SyntaxHighlighter
              language="javascript"
              style={syntaxStyle}
              codeTagProps={{style: {background: 'transparent'}}}
              customStyle={{
                backgroundColor: undefined,
                backgroundImage: undefined,
                border: 0,
                background: undefined,
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
              {text}
            </SyntaxHighlighter>
          ) : (
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-muted rounded w-5/6 mb-2"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
