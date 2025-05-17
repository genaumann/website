import {LOCALE_KEY} from '@/locales'

export default async function Page({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}) {
  const locale = (await params).locale
  const MDXPage = (await import(`./privacy_${locale}.mdx`)).default
  return (
    <div className="prose container">
      <MDXPage />
    </div>
  )
}
