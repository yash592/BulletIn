import React from 'react'
import { Input } from 'semantic-ui-react'
import { Form, Button } from 'react-bootstrap'

const InputExampleIcon = () =>
<div  style={{display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
  <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Control type="Search" placeholder="Enter a search term" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
</div>

export default InputExampleIcon
