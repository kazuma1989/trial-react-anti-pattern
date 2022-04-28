import { css } from "@emotion/css"
import { useEffect, useRef, useState } from "react"

const COLOR = "blue"

export function App() {
  const [play, setPlay] = useState(false)

  return (
    <div
      className={css`
        color: ${COLOR};
      `}
    >
      <h1>Hello</h1>

      <Video play={play} />

      <div>
        <button
          type="button"
          onClick={() => {
            setPlay((v) => !v)
          }}
        >
          {play ? "再生中" : "停止中"}
        </button>
      </div>
    </div>
  )
}

function Video({ play }: { play?: boolean }) {
  const video$ = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (play) {
      video$.current?.play()
    } else {
      video$.current?.pause()
    }
  }, [play])

  return (
    <video
      ref={video$}
      src="http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"
    />
  )
}
