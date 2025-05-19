import {BundledLanguage, BundledTheme, CodeToHastOptions} from 'shiki'

export const getShikiConfig = (
  lang: string
): CodeToHastOptions<BundledLanguage, BundledTheme> => {
  return {
    lang,
    themes: {dark: 'one-dark-pro', light: 'min-light'}
  }
}
