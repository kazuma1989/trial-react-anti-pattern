import { Container } from "react-bootstrap"
import { Route, Switch } from "wouter"
import { AllNav } from "./AllNav"
import { LoadingModalContainer } from "./GoodGlobalLoadingModal"
import { Page1 } from "./Page1"
import { Page2 } from "./Page2"
import { Page3 } from "./Page3"

export function App() {
  return (
    <LoadingModalContainer>
      <Container fluid="xxl">
        <AllNav />
      </Container>

      <Switch>
        <Route path="/">{() => <Page1 />}</Route>
        <Route path="/2">{() => <Page2 />}</Route>
        <Route path="/3">{() => <Page3 />}</Route>

        {/* will match everything else */}
        <Route path="/:rest*">
          {(params) => `404, Sorry the page "${params.rest}" does not exist!`}
        </Route>
      </Switch>
    </LoadingModalContainer>
  )
}
