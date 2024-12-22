import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  byPrefixAndName,
  IconName as FontAwesomeIconName
} from '@awesome.me/kit-b84c272999/icons'
import {
  IconPrefix as FaIconPrefix,
  IconProp
} from '@fortawesome/fontawesome-svg-core'
import {forwardRef} from 'react'
import CustomIcon, {CustomIconName} from '@/components/icons'

const defaultPrefix: FaIconPrefix = 'fal'

type IconName = FontAwesomeIconName | CustomIconName
type IconPrefix = 'fas' | 'fal' | 'fab' | 'custom'

const Icon = forwardRef<
  React.ElementRef<typeof FontAwesomeIcon>,
  Omit<React.ComponentPropsWithoutRef<typeof FontAwesomeIcon>, 'icon'> & {
    name: IconName
    prefix?: IconPrefix
  }
>(({name, prefix, className, ...props}, ref) => {
  if (prefix === 'custom')
    return <CustomIcon name={name as CustomIconName} className={className} />

  return (
    <FontAwesomeIcon
      ref={ref}
      {...props}
      icon={byPrefixAndName[prefix || defaultPrefix][name] as IconProp}
      className={className}
      fixedWidth
    />
  )
})

Icon.displayName = 'FAIcon'

export {type IconName, type IconPrefix}
export default Icon
