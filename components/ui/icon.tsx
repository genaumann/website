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
import {forwardRef} from 'react'

const defaultPrefix: FaIconPrefix = 'fal'

type IconName = FontAwesomeIconName | CustomIconName
type IconPrefix = 'fas' | 'fal' | 'fab'
export type IconProps = Omit<
  React.ComponentPropsWithRef<typeof FontAwesomeIcon>,
  'icon'
> & {
  name: IconName
  prefix?: IconPrefix
}

function renderIcon({name, prefix, className, ...props}: IconProps) {
  if (name in customIconMap) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {mask, transform, symbol, ...customIconProps} = props
    return (
      <CustomIcon
        name={name as CustomIconName}
        className={className}
        {...customIconProps}
      />
    )
  }

  return (
    <FontAwesomeIcon
      {...props}
      icon={byPrefixAndName[prefix || defaultPrefix][name] as IconProp}
      className={className}
      fixedWidth
    />
  )
}
// og image
function IconWithoutRef(props: IconProps) {
  return renderIcon(props)
}

const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  if (props.name in customIconMap)
    return (
      <CustomIcon
        ref={ref}
        name={props.name as CustomIconName}
        className={props.className}
      />
    )

  return renderIcon({...props, ref})
})

IconWithoutRef.displayName = 'IconWithoutRef'
Icon.displayName = 'Icon'

export {type IconName, type IconPrefix, IconWithoutRef}
export default Icon
