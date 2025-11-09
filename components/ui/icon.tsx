import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  byPrefixAndName,
  IconName as FontAwesomeIconName
} from '@awesome.me/kit-b84c272999/icons'
import {
  IconPrefix as FaIconPrefix,
  IconProp
} from '@fortawesome/fontawesome-svg-core'
import CustomIcon, {customIconMap, CustomIconName} from '@/components/icons'
import {forwardRef, SVGProps} from 'react'

export const defaultPrefix: FaIconPrefix = 'fal'

type IconName = FontAwesomeIconName | CustomIconName
type IconPrefix = 'fas' | 'fal' | 'fab'
export type IconProps = Omit<
  React.ComponentPropsWithRef<typeof FontAwesomeIcon>,
  'icon'
> & {
  name: IconName
  prefix?: IconPrefix
}

const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const {name, prefix, className, ...restProps} = props
  if (name in customIconMap)
    return (
      <CustomIcon
        {...(restProps as SVGProps<SVGSVGElement>)}
        ref={ref}
        name={name as CustomIconName}
        className={className}
      />
    )

  return (
    <FontAwesomeIcon
      {...restProps}
      ref={ref}
      icon={byPrefixAndName[prefix || defaultPrefix][name] as IconProp}
      className={className}
    />
  )
})

Icon.displayName = 'Icon'

export {type IconName, type IconPrefix}
export default Icon
