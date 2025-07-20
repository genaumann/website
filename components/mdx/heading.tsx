import {JSX} from 'react'
import Icon from '../ui/icon'

type Headings = 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export default function Heading({
  tag,
  ...props
}: {
  tag: Headings
} & JSX.IntrinsicElements[Headings]) {
  const {children, id: originalId, ...rest} = props
  const id =
    originalId ||
    children?.toString().trim().toLowerCase().replace(/\s+/g, '-') ||
    ''
  const Tag = tag
  return (
    <Tag id={id} {...rest}>
      <a
        href={`#${id}`}
        className="text-foreground no-underline font-bold group">
        {children}
        <Icon
          name="link"
          size="xs"
          className="hidden! ml-1 group-hover:inline-block!"
        />
      </a>
    </Tag>
  )
}
