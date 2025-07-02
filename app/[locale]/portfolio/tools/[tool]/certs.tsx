import CertGrid from '@/components/ui/cert-grid'
import {getCertsByKeyword} from '@/lib/cert'
import {getTranslate} from '@/lib/integrations/tolgee/server'

type ToolCertsPageProps = {
  tool: string
  title: string
}

export default async function TechnologyCertsPage({
  tool,
  title
}: ToolCertsPageProps) {
  const t = await getTranslate('portfolio')
  const certs = getCertsByKeyword(tool)
  if (!certs || certs.length === 0) return null

  return (
    <section className="py-10 bg-accent/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t('certificates', {ns: 'common'})}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('certDescription', {technology: title})}
          </p>
        </div>
        <CertGrid keyword={tool} />
      </div>
    </section>
  )
}
