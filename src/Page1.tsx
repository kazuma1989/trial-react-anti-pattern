import { useRef, useState } from "react"
import { Button, Card, Container, Stack } from "react-bootstrap"
import { BadGlobalToast, BadToastMessage } from "./BadGlobalToast"
import { BadVideo } from "./BadVideo"
import { GoodGlobalToast, ToastRef } from "./GoodGlobalToast"
import { GoodVideo, VideoRef } from "./GoodVideo"

export function Page1() {
  const [badPlay, setBadPlay] = useState(false)
  const [goodPlay, setGoodPlay] = useState(false)

  const [messages, setMessages] = useState<BadToastMessage[]>([
    {
      id: 1,
      message: "type=undefined",
    },
    {
      id: 2,
      type: "warning",
      message: "type=warning",
    },
    {
      id: 3,
      type: "danger",
      message: "type=danger",
    },
    {
      id: 4,
      type: "success",
      message: "type=success",
    },
  ])

  const toast$ = useRef<ToastRef>()

  const video$ = useRef<VideoRef>()

  return (
    <Container fluid="xxl">
      <BadGlobalToast messages={messages} setMessages={setMessages} />

      <GoodGlobalToast methodRef={toast$} />

      <Stack gap={3}>
        <div>
          <Button
            onClick={() => {
              setMessages([
                {
                  id: Date.now(),
                  message: "Hello",
                },
                ...messages,
              ])
            }}
          >
            トースト追加 (Bad)
          </Button>

          <Button
            onClick={() => {
              toast$.current?.notify({
                type: "success",
                message: "Nice!",
              })
            }}
          >
            トースト追加 (Good)
          </Button>
        </div>

        <Card>
          <BadVideo
            play={badPlay}
            src="http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"
          />

          <Card.Body>
            <Card.Title>Bad Video</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
            </Card.Text>

            <Button
              variant="primary"
              onClick={() => {
                setBadPlay((v) => !v)
              }}
            >
              {badPlay ? (
                <i className="bi bi-pause-fill"></i>
              ) : (
                <i className="bi bi-play-fill"></i>
              )}
            </Button>
          </Card.Body>
        </Card>

        <Card>
          <GoodVideo
            methodRef={video$}
            src="http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"
            onPlay={() => {
              setGoodPlay(true)
            }}
            onPause={() => {
              setGoodPlay(false)
            }}
          />

          <Card.Body>
            <Card.Title>Good Video</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
            </Card.Text>

            <Button
              variant="primary"
              onClick={() => {
                if (goodPlay) {
                  video$.current?.pause()
                } else {
                  video$.current?.play()
                }
              }}
            >
              {goodPlay ? (
                <i className="bi bi-pause-fill"></i>
              ) : (
                <i className="bi bi-play-fill"></i>
              )}
            </Button>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  )
}