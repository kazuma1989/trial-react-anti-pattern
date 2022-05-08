import { css } from "@emotion/css"
import { useImperativeHandle, useRef, useState } from "react"

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
  const [play, setPlay] = useState(false)

  const video$ = useRef<HTMLVideoElement>(null)
  const videoPlaying$ = useRef(false)

  useImperativeHandle(methodRef, () => ({
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
        if (videoPlaying$.current) {
          video$.current?.pause()
        } else {
          video$.current?.play()
        }

        setPlay((v) => !v)
      }}
    >
      <video
        ref={video$}
        src={src}
        controls={false}
        onPlay={() => {
          videoPlaying$.current = true
          setPlay(true)

          onPlay?.()
        }}
        onPause={() => {
          videoPlaying$.current = false
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
