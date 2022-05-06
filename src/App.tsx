import { LoadingModalContainer } from "./GoodGlobalLoadingModal"
import { ToastRefProvider } from "./GoodGlobalToast"
import { Page1 } from "./Page1"

export function App() {
  return (
    <LoadingModalContainer>
      <ToastRefProvider>
        <Page1 />
      </ToastRefProvider>
    </LoadingModalContainer>
  )
}
