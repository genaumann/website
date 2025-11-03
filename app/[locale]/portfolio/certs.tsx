import CertGrid from '@/components/ui/cert-grid'
import {getTranslate} from '@/lib/integrations/tolgee/server'

export default async function PortfolioCertsPage() {
  const t = await getTranslate()
  return (
    <section className="py-12 font-oswald" id="certs">
      <div className="container">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t('certificates')}
        </h2>
        <CertGrid />
      </div>
    </section>
  )
}
