import CertGrid from '@/components/ui/cert-grid'
import {getTranslations} from 'next-intl/server'

export default async function PortfolioCertsPage() {
  const t = await getTranslations('common')
  return (
    <section className="py-12" id="certs">
      <div className="container">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t('certificates')}
        </h2>
        <CertGrid />
      </div>
    </section>
  )
}
