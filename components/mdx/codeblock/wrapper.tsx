import Icon, {IconName} from '@/components/ui/icon'

interface CodeBlockWrapperProps {
  children: React.ReactNode
  title?: string
  titleIcon?: IconName
}

export default function CodeBlockWrapper({
  children,
  title,
  titleIcon
}: CodeBlockWrapperProps) {
  return (
    <div className="my-5 w-full rounded-md bg-card overflow-hidden shadow-md">
      <div className="px-4 py-3 bg-muted flex items-center max-h-9 border-b border-b-muted-foreground/10">
        {/* Style elements */}
        <div className="flex gap-2 shrink-0">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        {/* Title */}
        {(title || titleIcon) && (
          <div className="flex-1 text-center text-xs -ml-[52px]">
            {titleIcon && <Icon name={titleIcon} className="mr-1" />}
            {title && (
              <span className="font-mono text-muted-foreground">{title}</span>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
