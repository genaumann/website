import {IconName} from '@/components/ui/icon'

export const getIconByFileType = (
  fileType: (keyof typeof fileTypeIconMap)[number]
): IconName => {
  if (fileType in fileTypeIconMap) {
    return fileTypeIconMap[fileType]
  }
  return fileTypeIconMap.default
}

const fileTypeIconMap: Record<string, IconName> = {
  default: 'file',
  tsx: 'typescript',
  ts: 'typescript',
  typescript: 'typescript'
}
