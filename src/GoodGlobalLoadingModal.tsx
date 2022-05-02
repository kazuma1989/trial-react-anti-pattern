import { css } from "@emotion/css"
import {
  createContext,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { Modal, Spinner } from "react-bootstrap"

export interface LoadingModalRef {
  start(): void
  finish(): void
}

export function GoodGlobalLoadingModal() {
  const [loadingCount, setLoadingCount] = useState(0)

  const ref = useLoadingModalRef()
  useImperativeHandle(ref, () => ({
    start() {
      setLoadingCount((count) => count + 1)
    },

    finish() {
      setLoadingCount((count) => count - 1)
    },
  }))

  return (
    <Modal
      show={loadingCount >= 1}
      centered
      contentClassName={css`
        background-color: transparent;
        border: none;
        align-items: center;
      `}
    >
      <Spinner animation="border" />
    </Modal>
  )
}

const context = createContext<
  React.MutableRefObject<LoadingModalRef | undefined> | undefined
>(undefined)

export function useLoadingModalRef(): React.MutableRefObject<
  LoadingModalRef | undefined
> {
  const ref = useContext(context)
  if (!ref) {
    throw new Error("LoadingModalRefProviderで囲み忘れていませんか？")
  }

  return ref
}

interface LoadingModalRefProviderProps {
  children?: React.ReactNode
}

export function LoadingModalRefProvider({
  children,
}: LoadingModalRefProviderProps) {
  const modal$ = useRef<LoadingModalRef>()

  return <context.Provider value={modal$}>{children}</context.Provider>
}
