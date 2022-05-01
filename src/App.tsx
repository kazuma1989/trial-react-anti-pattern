import { useEffect, useRef, useState } from "react"
import { Button, Card, Container, Stack } from "react-bootstrap"
import { BadGlobalToast, BadToastMessage } from "./BadGlobalToast"
import { GoodGlobalToast, ToastRef } from "./GoodGlobalToast"

export function App() {
  const [play, setPlay] = useState(false)

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
          <Video play={play} />

          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
            </Card.Text>

            <Button
              variant="primary"
              onClick={() => {
                setPlay((v) => !v)
              }}
            >
              {play ? "再生中" : "停止中"}
            </Button>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
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
