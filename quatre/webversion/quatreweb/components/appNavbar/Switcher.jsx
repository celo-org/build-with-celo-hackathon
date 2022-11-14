import React from 'react'
import {
  Col,
  Row,
  Switch
} from 'antd';

export const Switcher = ({toggleMode}) => {
  return (
    <React.Fragment>
      <Row >
        <Col span={6} className='ml-4'>
          &nbsp;
          <Switch defaultChecked onClick={toggleMode} autoFocus={true} style={{border: '0.1em solid rgb(120, 145, 144, 0.5)'}}/>
          &nbsp;
        </Col>
    </Row>
  </React.Fragment>
  )
}
