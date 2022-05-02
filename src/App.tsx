import { LoadingModalRefProvider } from "./GoodGlobalLoadingModal"
import { ToastRefProvider } from "./GoodGlobalToast"
import { Page1 } from "./Page1"

export function App() {
  return (
    <LoadingModalRefProvider>
      <ToastRefProvider>
        <Page1 />
      </ToastRefProvider>
    </LoadingModalRefProvider>
  )
}
