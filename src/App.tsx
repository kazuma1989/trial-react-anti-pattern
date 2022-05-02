import { LoadingModalRefProvider } from "./GoodGlobalLoadingModal"
import { Page1 } from "./Page1"

export function App() {
  return (
    <LoadingModalRefProvider>
      <Page1 />
    </LoadingModalRefProvider>
  )
}
