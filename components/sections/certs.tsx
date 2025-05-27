import {getTranslations} from 'next-intl/server'
import CertGrid from '../ui/cert-grid'

export default async function Certs() {
  const t = await getTranslations()

  return (
    <section id="cert" className="py-20 container">
      <h2 className="text-5xl text-center mb-12">{t('common.certificates')}</h2>
      <CertGrid />
    </section>
  )
}
