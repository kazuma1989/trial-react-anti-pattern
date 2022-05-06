import { css } from "@emotion/css"
import { createContext, useContext, useState } from "react"
import { Modal, Spinner } from "react-bootstrap"

interface LoadingModal {
  start(): void
  finish(): void
}

export function useLoadingModal(): LoadingModal {
  const setLoadingCount = useContext(context)

  return {
    start() {
      setLoadingCount((count) => count + 1)
    },

    finish() {
      setLoadingCount((count) => count - 1)
    },
  }
}

interface LoadingModalContainerProps {
  children?: React.ReactNode
}

export function LoadingModalContainer({
  children,
}: LoadingModalContainerProps) {
  const [loadingCount, setLoadingCount] = useState(0)

  return (
    <context.Provider value={setLoadingCount}>
      <Modal
        show={loadingCount >= 1}
        dialogAs={() => (
          <div
            className={css`
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Spinner animation="border" />
          </div>
        )}
      />

      {children}
    </context.Provider>
  )
}

const context = createContext<React.Dispatch<React.SetStateAction<number>>>(
  () => {}
)
