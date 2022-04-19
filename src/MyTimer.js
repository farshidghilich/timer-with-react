import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

const MyTimer = ({ timer, active }) => {
  return (
    <ListGroupItem as='li' active={active}>
      <span>{Math.floor(timer / 6000)}</span>:
      <span>{Math.floor(timer / 100) % 60}</span> :<span>{timer % 100}</span>
    </ListGroupItem>
  )
}

export default MyTimer
