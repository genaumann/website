export const sanitizeString = (string?: string) => {
  if (!string) return ''
  return string.replace(/[^a-zA-Z0-9]/g, '')
}
