import { css } from "@emotion/css"
import { useState } from "react"
import { Modal, Spinner } from "react-bootstrap"

export let changeLoadingCount: (delta: number) => void

export function BadGlobalLoadingModal() {
  const [loadingCount, setLoadingCount] = useState(0)

  changeLoadingCount = (delta) => {
    setLoadingCount(loadingCount + delta)
  }

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
