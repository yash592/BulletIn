import React from 'react'
import { Input } from 'semantic-ui-react'
import { Form, Button } from 'react-bootstrap'

const InputExampleIcon = props => (
  <div  style={{display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
  <form>
    <label>
      <input type="text" placeholder="Enter a search term"  value={props.value} onChange={props.handleChange}/>
    </label>
    <Input type="submit" value="Search"  onClick={props.handleSearch}/>
  </form>
  </div>
)


export default InputExampleIcon
