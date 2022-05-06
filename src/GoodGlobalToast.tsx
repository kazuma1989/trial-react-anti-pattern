import { cx } from "@emotion/css"
import {
  createContext,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { Toast, ToastContainer } from "react-bootstrap"

interface Toast {
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

export function GoodGlobalToast() {
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

  const ref = useContext(context)
  useImperativeHandle(ref, () => ({
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

const context = createContext<
  React.MutableRefObject<Toast | undefined> | undefined
>(undefined)

export function useToastRef(): React.MutableRefObject<Toast | undefined> {
  const ref = useContext(context)
  if (!ref) {
    throw new Error("ToastRefProviderで囲み忘れていませんか？")
  }

  return ref
}

interface ToastRefProviderProps {
  children?: React.ReactNode
}

export function ToastRefProvider({ children }: ToastRefProviderProps) {
  const toast$ = useRef<Toast>()

  return <context.Provider value={toast$}>{children}</context.Provider>
}
