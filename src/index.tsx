import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { SWRConfig } from "swr"
import { Router } from "wouter"
import { App } from "./App"

createRoot(globalThis.document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        dedupingInterval: 86400_000,
      }}
    >
      <Router base={import.meta.env.BASE_URL.replace(/\/+$/, "")}>
        <App />
      </Router>
    </SWRConfig>
  </StrictMode>
)
