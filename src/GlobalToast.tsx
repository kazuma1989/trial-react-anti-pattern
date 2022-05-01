import { cx } from "@emotion/css"
import { Toast, ToastContainer } from "react-bootstrap"

interface Props {
  messages?: {
    id: number | string
    type?: "success" | "warning" | "danger"
    message: string
  }[]
}

export function GlobalToast({ messages }: Props) {
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 100 }}>
      {messages?.map(({ id, type, message }) => {
        let darkBg: boolean
        let icon: JSX.Element
        switch (type) {
          case "success": {
            darkBg = true
            icon = <i className="bi bi-check-square-fill me-1"></i>
            break
          }

          case "warning": {
            darkBg = false
            icon = <i className="bi bi-exclamation-triangle-fill me-1"></i>
            break
          }

          case "danger": {
            darkBg = true
            icon = <i className="bi bi-x-circle-fill me-1"></i>
            break
          }

          default: {
            darkBg = false
            icon = <i className="bi bi-info-circle me-1"></i>
          }
        }

        return (
          <Toast key={id} bg={type}>
            <Toast.Header>
              {icon}
              <strong className="me-auto">
                {type ? type.toUpperCase() : "INFO"}
              </strong>
            </Toast.Header>

            <Toast.Body className={cx(darkBg && "text-white")}>
              {message}
            </Toast.Body>
          </Toast>
        )
      })}
    </ToastContainer>
  )
}
