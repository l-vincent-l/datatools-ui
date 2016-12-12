import React, {Component} from 'react'
import { Row, Col, Button, Panel, Glyphicon, Form, Radio, Checkbox, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import update from 'react-addons-update'
import { shallowEqual } from 'react-pure-render'

import { getMessage, getComponentMessages } from '../../common/util/config'

export default class DeploymentSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deployment: {
        buildConfig: {},
        routerConfig: {},
        otpServers: this.props.project && this.props.project.otpServers ? this.props.project.otpServers : []
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      deployment: {
        buildConfig: {},
        routerConfig: {},
        otpServers: nextProps.project && nextProps.project.otpServers ? nextProps.project.otpServers : []
      }
    })
  }
  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)
  }
  render () {
    console.log(this.state)
    const messages = getComponentMessages('ProjectSettings')
    const { project, editDisabled, updateProjectSettings } = this.props
    const noEdits = Object.keys(this.state.deployment.buildConfig).length === 0 &&
      Object.keys(this.state.deployment.routerConfig).length === 0 &&
      shallowEqual(this.state.deployment.otpServers, project.otpServers)
    return (
      <div className='deployment-settings-panel'>
        <Panel header={<h4>{getMessage(messages, 'deployment.buildConfig.title')}</h4>}>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <FormControl
                  componentClass='select'
                  defaultValue={project.buildConfig && project.buildConfig.fetchElevationUS ? project.buildConfig.fetchElevationUS : ''}
                  label={getMessage(messages, 'deployment.buildConfig.fetchElevationUS')}
                  ref='fetchElevationUS'
                  onChange={(evt) => {
                    let stateUpdate = { deployment: { buildConfig: { fetchElevationUS: { $set: (evt.target.value === 'true') } } } }
                    this.setState(update(this.state, stateUpdate))
                  }}>
                  <option value='false'>false</option>
                  <option value='true'>true</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <FormControl
                  componentClass='select'
                  defaultValue={project.buildConfig && project.buildConfig.stationTransfers ? project.buildConfig.stationTransfers : ''}
                  label={getMessage(messages, 'deployment.buildConfig.stationTransfers')}
                  ref='stationTransfers'
                  onChange={(evt) => {
                    let stateUpdate = { deployment: { buildConfig: { stationTransfers: { $set: (evt.target.value === 'true') } } } }
                    this.setState(update(this.state, stateUpdate))
                  }}>
                  <option value='false'>false</option>
                  <option value='true'>true</option>
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <FormControl
              defaultValue={project.buildConfig && project.buildConfig.subwayAccessTime ? project.buildConfig.subwayAccessTime : ''}
              placeholder='2.5 (min)'
              label={getMessage(messages, 'deployment.buildConfig.subwayAccessTime')}
              ref='subwayAccessTime'
              onChange={(evt) => {
                let stateUpdate = { deployment: { buildConfig: { subwayAccessTime: { $set: +evt.target.value } } } }
                this.setState(update(this.state, stateUpdate))
              }} />
          </FormGroup>
          <FormGroup>
            <FormControl
              defaultValue={project.buildConfig && project.buildConfig.fares ? project.buildConfig.fares : ''}
              placeholder='fares'
              label={getMessage(messages, 'deployment.buildConfig.fares')}
              ref='fares'
              onChange={(evt) => {
                let stateUpdate = { deployment: { buildConfig: { fares: { $set: evt.target.value } } } }
                this.setState(update(this.state, stateUpdate))
              }} />
          </FormGroup>
        </Panel>
        <Panel header={<h4>Router Config</h4>}>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <FormControl
                  type='integer'
                  defaultValue={project.routerConfig && project.routerConfig.numItineraries ? project.routerConfig.numItineraries : ''}
                  placeholder='6'
                  label={getMessage(messages, 'deployment.buildConfig.numItineraries')}
                  ref='numItineraries'
                  onChange={(evt) => {
                    let stateUpdate = { deployment: { routerConfig: { numItineraries: { $set: +evt.target.value } } } }
                    this.setState(update(this.state, stateUpdate))
                  }} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <FormControl
                  type='number'
                  defaultValue={project.routerConfig && project.routerConfig.walkSpeed ? project.routerConfig.walkSpeed : ''}
                  placeholder='3.0'
                  label={getMessage(messages, 'deployment.buildConfig.walkSpeed')}
                  ref='walkSpeed'
                  onChange={(evt) => {
                    let stateUpdate = { deployment: { routerConfig: { walkSpeed: { $set: +evt.target.value } } } }
                    this.setState(update(this.state, stateUpdate))
                  }} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <FormControl
                  type='number'
                  defaultValue={project.routerConfig && project.routerConfig.stairsReluctance ? project.routerConfig.stairsReluctance : ''}
                  placeholder='2.0'
                  label={getMessage(messages, 'deployment.buildConfig.stairsReluctance')}
                  ref='stairsReluctance'
                  onChange={(evt) => {
                    let stateUpdate = { deployment: { routerConfig: { stairsReluctance: { $set: +evt.target.value } } } }
                    this.setState(update(this.state, stateUpdate))
                  }} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <FormControl
                  type='number'
                  defaultValue={project.routerConfig && project.routerConfig.carDropoffTime ? project.routerConfig.carDropoffTime : ''}
                  placeholder='240 (sec)'
                  label={getMessage(messages, 'deployment.buildConfig.carDropoffTime')}
                  ref='carDropoffTime'
                  onChange={(evt) => {
                    let stateUpdate = { deployment: { routerConfig: { carDropoffTime: { $set: +evt.target.value } } } }
                    this.setState(update(this.state, stateUpdate))
                  }} />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <FormControl
              type='text'
              defaultValue={project.routerConfig && project.routerConfig.brandingUrlRoot ? project.routerConfig.brandingUrlRoot : ''}
              placeholder='http://gtfs.example.com/branding'
              label={getMessage(messages, 'deployment.buildConfig.brandingUrlRoot')}
              ref='brandingUrlRoot'
              onChange={(evt) => {
                let stateUpdate = { deployment: { routerConfig: { brandingUrlRoot: { $set: evt.target.value } } } }
                this.setState(update(this.state, stateUpdate))
              }} />
          </FormGroup>
        </Panel>
        <Panel header={
          <h4>
            <Button
              className='pull-right'
              bsStyle='success'
              bsSize='xsmall'
              onClick={() => {
                let stateUpdate = { deployment: { otpServers: { $push: [{name: '', publicUrl: '', internalUrl: [], admin: false}] } } }
                this.setState(update(this.state, stateUpdate))
              }}>
              <Glyphicon glyph='plus' /> {getMessage(messages, 'deployment.servers.new')}
            </Button>
            {getMessage(messages, 'deployment.servers.title')}
          </h4>
        }>
          <div>
            {this.state.deployment.otpServers && this.state.deployment.otpServers.map((server, i) => {
              let title = (
                <h5>
                  {server.name}{'  '}
                  <small>{server.publicUrl}</small>
                </h5>
              )
              return (
                <Panel key={i}
                  header={server.name ? title : `[${getMessage(messages, 'deployment.servers.serverPlaceholder')}]`}
                  defaultExpanded={server.name === ''}
                  collapsible>
                  <Form>
                    <Button
                      bsSize='xsmall'
                      bsStyle='danger'
                      className='pull-right'
                      onClick={() => {
                        let stateUpdate = { deployment: { otpServers: { $splice: [[i, 1]] } } }
                        this.setState(update(this.state, stateUpdate))
                      }}>
                      Remove <Glyphicon glyph='remove' />
                    </Button>
                    <FormGroup>
                      <ControlLabel>{getMessage(messages, 'deployment.servers.name')}</ControlLabel>
                      <FormControl
                        type='text'
                        placeholder={getMessage(messages, 'deployment.servers.namePlaceholder')}
                        defaultValue={server.name}
                        onChange={(evt) => {
                          let stateUpdate = { deployment: { otpServers: { [i]: { $merge: { name: evt.target.value } } } } }
                          this.setState(update(this.state, stateUpdate))
                        }} />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>{getMessage(messages, 'deployment.servers.public')}</ControlLabel>
                      <FormControl
                        type='text'
                        placeholder='http://otp.example.com'
                        defaultValue={server.publicUrl}
                        onChange={(evt) => {
                          let stateUpdate = { deployment: { otpServers: { [i]: { $merge: { publicUrl: evt.target.value } } } } }
                          this.setState(update(this.state, stateUpdate))
                        }} />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>{getMessage(messages, 'deployment.servers.internal')}</ControlLabel>
                      <FormControl
                        type='text'
                        placeholder='http://127.0.0.1/otp,http://0.0.0.0/otp'
                        defaultValue={server.internalUrl && server.internalUrl.join(',')}
                        onChange={(evt) => {
                          let stateUpdate = { deployment: { otpServers: { [i]: { $merge: { internalUrl: evt.target.value.split(',') } } } } }
                          this.setState(update(this.state, stateUpdate))
                        }} />
                    </FormGroup>
                    <Checkbox
                      checked={server.admin}
                      onChange={(evt) => {
                        let stateUpdate = { deployment: { otpServers: { [i]: { $merge: { admin: evt.target.checked } } } } }
                        this.setState(update(this.state, stateUpdate))
                      }}>
                      {getMessage(messages, 'deployment.servers.admin')}
                    </Checkbox>
                  </Form>
                </Panel>
              )
            })}
          </div>
        </Panel>
        <Panel header={<h4>{getMessage(messages, 'deployment.osm.title')}</h4>}>
          <FormGroup
            onChange={(evt) => {
              let stateUpdate = { deployment: { useCustomOsmBounds: { $set: (evt.target.value === 'true') } } }
              this.setState(update(this.state, stateUpdate))
            }}
          >
            <Radio
              name='osm-extract'
              checked={typeof this.state.deployment.useCustomOsmBounds !== 'undefined' ? !this.state.deployment.useCustomOsmBounds : !project.useCustomOsmBounds}
              value={false}>
              {getMessage(messages, 'deployment.osm.gtfs')}
            </Radio>
            <Radio
              name='osm-extract'
              checked={typeof this.state.deployment.useCustomOsmBounds !== 'undefined' ? this.state.deployment.useCustomOsmBounds : project.useCustomOsmBounds}
              value>
              {getMessage(messages, 'deployment.osm.custom')}
            </Radio>
          </FormGroup>
          {project.useCustomOsmBounds || this.state.deployment.useCustomOsmBounds
            ? <FormControl
              type='text'
              defaultValue={project.osmNorth !== null ? `${project.osmWest},${project.osmSouth},${project.osmEast},${project.osmNorth}` : ''}
              placeholder='-88.45,33.22,-87.12,34.89'
              label={(<span><Glyphicon glyph='fullscreen' /> {getMessage(messages, 'deployment.osm.bounds')}</span>)}
              ref='osmBounds'
              onChange={(evt) => {
                const bBox = evt.target.value.split(',')
                if (bBox.length === 4) {
                  let stateUpdate = { deployment: { $merge: { osmWest: bBox[0], osmSouth: bBox[1], osmEast: bBox[2], osmNorth: bBox[3] } } }
                  this.setState(update(this.state, stateUpdate))
                }
              }} />
            : null
          }
        </Panel>
        <Row>
          <Col md={12}>
            {/* Save button */}
            <Button
              bsStyle='primary'
              type='submit'
              disabled={editDisabled || noEdits}
              onClick={(evt) => {
                evt.preventDefault()
                console.log(this.state)
                console.log(project)
                updateProjectSettings(project, this.state.deployment)
              }}>
              {getMessage(messages, 'save')}
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}