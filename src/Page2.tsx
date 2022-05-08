import { useState } from "react"
import { Container, Stack } from "react-bootstrap"
import { BadVideo } from "./BadVideo"

export function Page2() {
  const [badPlay, setBadPlay] = useState(false)

  return (
    <Container fluid="xxl" className="py-3">
      <Stack gap={3}>
        <p>PAGE 2</p>

        <div>
          <p>Bad video</p>

          <BadVideo
            play={badPlay}
            src="http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"
            onClick={() => {
              setBadPlay(!badPlay)
            }}
          />
        </div>
      </Stack>
    </Container>
  )
}
