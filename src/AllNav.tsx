import { Nav } from "react-bootstrap"
import { Link } from "wouter"

export function AllNav() {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Link to="/">
          <Nav.Link>/</Nav.Link>
        </Link>
      </Nav.Item>

      <Nav.Item>
        <Link to="/2">
          <Nav.Link>/2</Nav.Link>
        </Link>
      </Nav.Item>

      <Nav.Item>
        <Link to="/foo/404">
          <Nav.Link>/foo/404</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  )
}
