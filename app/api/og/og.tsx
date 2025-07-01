import {findArticleBySlug} from '@/lib/mdx-edge'
import {origin} from '@/lib/url'
import {ImageResponse} from 'next/og'
import {readFile} from 'node:fs/promises'
import {join} from 'node:path'

type OGImageProps = {
  article?: Awaited<ReturnType<typeof findArticleBySlug>>
  title?: string
  description: string
}

export default async function OGImage({
  article,
  title,
  description
}: OGImageProps) {
  /* eslint-disable @next/next/no-img-element */

  const oswald = await readFile(
    join(process.cwd(), 'assets/Oswald-Regular.ttf')
  )
  const oswaldSemiBold = await readFile(
    join(process.cwd(), 'assets/Oswald-SemiBold.ttf')
  )
  const oswaldBold = await readFile(
    join(process.cwd(), 'assets/Oswald-Bold.ttf')
  )

  title = title || article?.title

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col bg-[#fafffb] py-4 px-12">
        <img
          src={`${origin}/logo.png`}
          alt="Logo"
          width={75}
          height={43}
          tw="self-end"
        />
        <div tw="flex py-32 self-center">
          <div tw="flex flex-col w-[25%]">
            <div tw="flex items-center w-full">
              <img src={`${origin}/me-black-wide.png`} alt="Gino" />
            </div>
            {title !== 'Gino Naumann' && (
              <div tw="flex mt-4 w-full">
                <h2 tw="text-5xl text-black font-semibold flex flex-col items-center ml-4">
                  <span>Gino</span>
                  <span>Naumann</span>
                </h2>
              </div>
            )}
          </div>
          <div tw="flex flex-col w-[72%] ml-12 items-center">
            <h1 tw="text-7xl text-[#00e639] font-bold">{title}</h1>
            <p tw="text-white text-3xl text-neutral-400">{description}</p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Oswald',
          data: oswald,
          weight: 400,
          style: 'normal'
        },
        {
          name: 'Oswald',
          data: oswaldSemiBold,
          weight: 600,
          style: 'normal'
        },
        {
          name: 'Oswald',
          data: oswaldBold,
          weight: 700,
          style: 'normal'
        }
      ]
    }
  )
}
