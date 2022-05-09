import { useState } from "react"
import { Container, Stack, Table } from "react-bootstrap"

export function Page3() {
  const [thumbnail, setImg] = useState("")

  return (
    <Container fluid="xxl" className="py-3">
      <Stack gap={3}>
        <div>
          <input
            type="file"
            accept="video/*"
            onChange={async (e) => {
              const thumbnail = await generateVideoThumbnail(
                e.target.files![0]!
              )

              setImg(thumbnail)
            }}
          />

          {thumbnail && <img src={thumbnail} alt="動画のサムネイル" />}
        </div>

        <Table hover striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>

            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Stack>
    </Container>
  )
}

function generateVideoThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const video = document.createElement("video")
    video.autoplay = true
    video.muted = true
    video.src = URL.createObjectURL(file)

    const canvas = document.createElement("canvas")
    video.onloadeddata = () => {
      const ctx = canvas.getContext("2d")!

      canvas.height = Math.min(500, video.videoHeight)
      canvas.width = (video.videoWidth * canvas.height) / video.videoHeight

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      video.pause()

      resolve(canvas.toDataURL("image/jpeg"))
    }
  })
}
