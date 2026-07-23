import {FileIcon} from 'lucide-react'
import CustomIcon from '@/components/icons'

export const getIconByFileType = (
  fileType: (keyof typeof fileTypeIconMap)[number]
): React.ReactNode => {
  if (fileType in fileTypeIconMap) {
    return fileTypeIconMap[fileType]
  }
  return fileTypeIconMap.default
}

const fileTypeIconMap: Record<string, React.ReactNode> = {
  default: <FileIcon width={14} height={14} />,
  tsx: <CustomIcon name="typescript" className="size-4" />,
  ts: <CustomIcon name="typescript" className="size-4" />,
  typescript: <CustomIcon name="typescript" className="size-4" />
}
