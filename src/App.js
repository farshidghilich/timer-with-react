import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Row,
  Container,
  Col,
  ListGroup,
  Spinner,
} from 'react-bootstrap'
import MyTimer from './MyTimer'

const App = () => {
  const [timer, setTimer] = useState([0])
  const [status, setStatus] = useState(true)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    const myTimer =
      !status &&
      !pause &&
      setInterval(() => {
        setTimer((p) => {
          const temp = [...p]
          temp[temp.length - 1] += 1
          return [...temp]
        })
      }, 10)
    return () => {
      clearInterval(myTimer)
    }
  }, [status, pause])

  return (
    <Container>
      <Row>
        <Col
          style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
        >
          {status ? (
            <Button
              onClick={() => {
                setStatus(false)
              }}
            >
              <i className='fas fa-running'></i>
            </Button>
          ) : (
            <>
              <Button
                variant='outline-primary'
                disabled={pause}
                onClick={() => setTimer((x) => [...x, x[x.length - 1]])}
              >
                <i className='fas fa-stopwatch-20'></i>
              </Button>
              <Button
                variant={pause ? 'warning' : 'info'}
                style={{ margin: '0 10px' }}
                onClick={() => {
                  setPause((e) => !e)
                }}
              >
                {pause ? (
                  <i className='far fa-play-circle'></i>
                ) : (
                  <i className='far fa-pause-circle'></i>
                )}
              </Button>
              <Button
                variant='danger'
                onClick={() => {
                  setStatus(true)
                  setTimer([0])
                }}
              >
                <i className='far fa-trash-alt'></i>
              </Button>
              {!pause && (
                <Spinner animation='border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup as='ul'>
            {timer.map((item, index) => (
              <MyTimer
                key={index}
                timer={item}
                active={index === timer.length - 1 && !pause}
              />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default App
