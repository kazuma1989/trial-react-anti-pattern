import { cx } from "@emotion/css"
import { useEffect } from "react"
import { Toast, ToastContainer } from "react-bootstrap"

interface Props {
  messages?: BadToastMessage[]
  // useStateの戻り値の型をそのまま使っているが、
  // setMessagesの全権を握らせるくらいなら、GlobalToast自身のステートとして持てばいいのに。
  // トーストをクリックしても消すし、外の都合でも消せるように（トーストを無視して次の処理を始めたというような）という
  // 要求からこの歪な形が生まれたのであろう。
  setMessages?: React.Dispatch<React.SetStateAction<BadToastMessage[]>>
}

export interface BadToastMessage {
  id: number | string
  type?: "success" | "warning" | "danger"
  message: string
  // hideにしておけば、デフォルトがfalsyになってuseEffectでわざわざtrueをセットする必要もない。
  // が、そもそも内部管理用の値を公開するのは良くない。
  // 別途内部のステートとして持つべき。
  show?: boolean
}

export function BadGlobalToast({ messages, setMessages }: Props) {
  useEffect(() => {
    // mutateはしてはいけない！
    messages?.forEach((message) => {
      message.show = true
    })

    // deps違反
  }, [])

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 100 }}>
      {messages?.map(({ id, type, message, show }) => {
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
              setMessages?.(
                messages?.map((message) => {
                  if (message.id === id) {
                    // mutateしてはいけない！
                    // setMessagesとArray.mapとmutateの組み合わせは意味がわからないが、
                    // 最初はmutateだけでなんとかしようとしていた→レンダリングが起きないからsetMessages、というシナリオ。
                    message.show = false
                  }

                  return message
                })
              )
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
