import CodeBlockCopyButton from './copy-button'

type CodeBlockTerminalProps = {
  code: string
  id?: string
}

export default function CodeBlockTerminal({code, id}: CodeBlockTerminalProps) {
  return (
    <div className="relative">
      <div
        className="w-full overflow-x-auto prose codeblock-terminal"
        id={id}
        dangerouslySetInnerHTML={{__html: code}}
      />
      <div className="absolute -top-9 right-0">
        <CodeBlockCopyButton id={id} />
      </div>
    </div>
  )
}
