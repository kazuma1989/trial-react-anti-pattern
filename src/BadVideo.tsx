import { css } from "@emotion/css"
import { useEffect, useRef } from "react"

interface Props {
  play?: boolean
  src?: string
  onClick?(): void
}

export function BadVideo({ play, src, onClick }: Props) {
  const video$ = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (play) {
      video$.current?.play()
    } else {
      video$.current?.pause()
    }
  }, [play])

  return (
    <VideOverlay play={play} onClick={onClick}>
      <video
        ref={video$}
        src={src}
        controls={false}
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
