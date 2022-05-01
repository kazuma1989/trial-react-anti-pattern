import { cx } from "@emotion/css"
import { useImperativeHandle, useState } from "react"
import { Toast, ToastContainer } from "react-bootstrap"

interface Props {
  methodRef?: React.MutableRefObject<ToastRef | undefined>
}

export interface ToastRef {
  notify(message: GoodToastMessage): void
}

interface GoodToastMessage {
  type?: "success" | "warning" | "danger"
  message: string
}

interface InnerToastMessage extends GoodToastMessage {
  id: number
  show: boolean
}

export function GoodGlobalToast({ methodRef }: Props) {
  const [messages, setMessages] = useState<InnerToastMessage[]>([])

  const hideMessage = (id: number) => {
    // ここの `(messages) =>` をなくすと挙動が壊れるのが観察できる。
    setMessages((messages) =>
      messages.map((message) => {
        if (message.id === id) {
          return { ...message, show: false }
        }

        return message
      })
    )

    // クリーンアップ
    setTimeout(() => {
      // ここの `(messages) =>` をなくすと挙動が壊れるのが観察できる。
      setMessages((messages) => messages.filter((message) => message.id !== id))
    }, 1_000)
  }

  useImperativeHandle(methodRef, () => ({
    notify(message) {
      const id = Date.now()

      setMessages((messages) => [{ ...message, id, show: true }, ...messages])

      setTimeout(() => {
        hideMessage(id)
      }, 3_000)
    },
  }))

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 100 }}>
      {messages.map(({ id, type, message, show }) => {
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
          <Toast
            key={id}
            show={show}
            bg={type}
            onClose={() => {
              hideMessage(id)
            }}
          >
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
