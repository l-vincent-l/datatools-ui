import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import ManagerPage from './ManagerPage'
import { Link } from 'react-router'
export default class PageNotFound extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <ManagerPage>
          <Grid>
            <Row>
              <Col xs={12}>
                <h1>Page Not Found.</h1>
                <p>Go to <Link to="/">Home Page</Link></p>
              </Col>
            </Row>
          </Grid>
        </ManagerPage>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to <Link to="/">Home Page</Link></p>
      </div>
    )
  }
}
