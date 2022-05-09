import { css } from "@emotion/css"
import { useImperativeHandle, useRef, useState } from "react"

interface VideoInstance {
  playing: boolean
  play(): void
  pause(): void
}

interface Props {
  src?: string
  onPlay?(): void
  onPause?(): void
  videoRef?: React.MutableRefObject<VideoInstance | undefined>
}

export function GoodVideo({ src, videoRef, onPlay, onPause }: Props) {
  const [play, setPlay] = useState(false)

  const video$ = useRef<HTMLVideoElement>(null)
  const playing$ = useRef(false)

  useImperativeHandle(videoRef, () => ({
    get playing(): boolean {
      return playing$.current
    },

    play() {
      video$.current?.play()
    },

    pause() {
      video$.current?.pause()
    },
  }))

  return (
    <VideOverlay
      play={play}
      onClick={() => {
        if (playing$.current) {
          video$.current?.pause()
        } else {
          video$.current?.play()
        }
      }}
    >
      <video
        ref={video$}
        src={src}
        controls={false}
        onPlay={() => {
          playing$.current = true
          setPlay(true)

          onPlay?.()
        }}
        onPause={() => {
          playing$.current = false
          setPlay(false)

          onPause?.()
        }}
        className={css`
          width: 100%;
          display: block;
        `}
      />
    </VideOverlay>
  )
}

interface VideoOverlayProps {
  play?: boolean
  onClick?(): void
  children?: React.ReactNode
}

function VideOverlay({ play, onClick, children }: VideoOverlayProps) {
  return (
    <div
      className={css`
        position: relative;
      `}
    >
      {children}

      <button
        type="button"
        onClick={onClick}
        className={css`
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;

          background-color: rgba(0, 0, 0, 0.3);
          color: white;
          border: none;
          padding: 0;

          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 96px;

          transition: opacity 300ms;
          :not(:hover > &):not(&:focus-visible) {
            opacity: 0;
          }
        `}
      >
        {play ? (
          <i className="bi bi-pause-fill"></i>
        ) : (
          <i className="bi bi-play-fill"></i>
        )}
      </button>
    </div>
  )
}

export function useVideoRef(): React.MutableRefObject<
  VideoInstance | undefined
> {
  return useRef<VideoInstance>()
}
