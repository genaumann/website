import {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  createHighlighter,
  LanguageInput,
  SpecialLanguage,
  StringLiteralUnion
} from 'shiki'

export const THEMES = {dark: 'one-dark-pro', light: 'min-light'}

export const getShikiConfig = (
  lang: string
): CodeToHastOptions<BundledLanguage, BundledTheme> => {
  return {
    lang,
    themes: THEMES
  }
}

export const getClientHighlighter = async (
  lang: (
    | LanguageInput
    | SpecialLanguage
    | StringLiteralUnion<BundledLanguage, string>
  )[]
) => {
  return createHighlighter({
    themes: Object.values(THEMES),
    langs: lang
  })
}
