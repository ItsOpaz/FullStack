import React from 'react'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleNewBlog = (event) => {
    event.preventDefault()
    props.newBlog({
      title: title.value, author: author.value, url: url.value
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <div position='center'>
              <Form.Group>
            author:
                <Form.Control { ...author }/>
            title:
                <Form.Control { ...title }/>
            url:
                <Form.Control { ...url }/><br/>
                <Button variant="primary" type="submit">create</Button>
              </Form.Group>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default NewBlog