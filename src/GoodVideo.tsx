import { useImperativeHandle, useRef } from "react"

interface Props {
  src?: string
  onPlay?(): void
  onPause?(): void
  methodRef?: React.MutableRefObject<VideoRef | undefined>
}

export interface VideoRef {
  play(): void
  pause(): void
}

export function GoodVideo({ src, methodRef, onPlay, onPause }: Props) {
  const video$ = useRef<HTMLVideoElement>(null)

  useImperativeHandle(methodRef, () => ({
    play() {
      video$.current?.play()
    },

    pause() {
      video$.current?.pause()
    },
  }))

  return <video ref={video$} src={src} onPlay={onPlay} onPause={onPause} />
}
