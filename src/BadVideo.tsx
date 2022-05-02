import { useEffect, useRef } from "react"

interface Props {
  play?: boolean
  src?: string
}

export function BadVideo({ play, src }: Props) {
  const video$ = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (play) {
      video$.current?.play()
    } else {
      video$.current?.pause()
    }
  }, [play])

  return <video ref={video$} src={src} />
}
