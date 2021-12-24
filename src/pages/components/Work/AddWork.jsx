import React from 'react';
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

import { Link, useHistory } from 'react-router-dom';
import { Routes } from '../../../routes';
import workServices from '../../../services/work.services'


export default () => {
  const [input, setInput] = React.useState({ title: '', description: '', beginDate: '', endDate: '' ,userAssign: '6174d5109bf03f565fe5303d'});

  const history = useHistory();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  }

  const onSubmit = async (e) => {
    
    e.preventDefault();
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
        console.log(input[key]);
        if (key === 'userAssign') {
            for (let i = 0; i < input[key].length; i++) {
                formData.append(`${key}[${i}]`, input[key][i]);
            }
        } else {
            formData.append(key, input[key]);
        }
    });
    await workServices.createWorkByForm(formData);
    console.log(input);
    
    history.push(Routes.WorkManagement.path);
    

  }

  return (
    <>
      <Form className="mt-4" onSubmit={onSubmit}>
        <Form.Group id="title" className="mb-4">
          <Form.Label>Work Title</Form.Label>
          <InputGroup>
            <InputGroup.Text>

            </InputGroup.Text>
            <Form.Control autoFocus  type="text" placeholder="Work title" name='title' onChange={onChange} required />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Group id="description" className="mb-4">
            <Form.Label>Work content</Form.Label>
            <InputGroup>
              <InputGroup.Text>

              </InputGroup.Text>
              <Form.Control  type="text" placeholder="Work content" name='description' onChange={onChange} required />
            </InputGroup>
          </Form.Group>
        </Form.Group>

        <Form.Group>
          <Form.Group id="beginDate" className="mb-4">
            <Form.Label>Choose Begin Date</Form.Label>
            <InputGroup>
              <Form.Control required type="date" name = "beginDate" onChange={onChange}  />
            </InputGroup>
          </Form.Group>
        </Form.Group>

        <Form.Group id="endDate" className="mb-4">
          <Form.Label>Choose Finish Date</Form.Label>
          <InputGroup>
            <Form.Control type="date" name ='endDate' onChange={onChange} required />
          </InputGroup>
        </Form.Group>

        <Form.Group id="userAssign" className="mb-4">
          <Form.Label>User</Form.Label>
          <InputGroup>
            <Form.Control type="text" name ='userAssign' value="6174d5109bf03f565fe5303d"   />
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Add Work
        </Button>
      </Form>
    </>
  )
}