import {Skeleton} from '../../ui/skeleton'

export default function TocSkeleton() {
  return (
    <div className="space-y-4 mt-6">
      {Array.from({length: 5}).map((_, index) => (
        <Skeleton key={index} className="h-5 w-3/4" />
      ))}
    </div>
  )
}
