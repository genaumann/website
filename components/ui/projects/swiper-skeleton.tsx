import {cn} from '@/lib/cn'
import {Skeleton} from '../skeleton'

export default function PortfolioProjectSwiperSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 py-12 overflow-hidden h-[660px]">
      {Array.from({length: 3}).map((_, index) => (
        <div className="relative" key={index}>
          <Skeleton className="absolute right-2.5 -top-3 w-24 h-6 rounded-md bg-primary/40" />
          <Skeleton
            className={cn(
              'h-[620px]',
              index === 2 && 'hidden xl:block',
              index === 1 && 'hidden lg:block'
            )}
          />
        </div>
      ))}
    </div>
  )
}
