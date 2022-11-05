import { ChangeEvent, useState } from 'react';
import 'react-calendar/dist/Calendar.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Calendar from 'react-calendar';
import Moment from 'react-moment';


import { Loading } from '../components';
import { useEmployee } from '../hooks/useemployee';
import { Employee } from '../interface/ServiceInterface';



export interface NewReg {
  name:string;
  last_name:string;
  birthday:Date;
}

export const EmployeesPage = () => {
    
  const {isLoading,employees,handleSumit} = useEmployee();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const limit = 30;

  const handleNameChange = ({target}:ChangeEvent<HTMLInputElement>) =>{
    setFirstName(target.value.slice(0,limit));
  }

  const handleLastNameChange = ({target}:ChangeEvent<HTMLInputElement>) =>{
    setLastName(target.value.slice(0,limit));
  }

  const resetForm = ()=>{
    setLastName('');
    setFirstName('');
    setCurrentPage(0);
    setStartDate(new Date());
  }

  const sendInfo = async()=> {

    const obj:NewReg ={
      name:firstName,
      last_name:lastName,
      birthday:startDate
    }
     await handleSumit(obj);
     resetForm();
     handleClose();
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
    const form = event.currentTarget;

    console.log('entra');

    if (form.checkValidity() === false) {
      event.preventDefault();     
      event.stopPropagation();
      
    }else{
      event.preventDefault();
      event.stopPropagation();
      sendInfo();
    }

    setValidated(true);
  };

  const filteredEmployee = ():Employee[] => {

      if(search.length ===0)
        return employees.slice(currentPage,currentPage+10);
      
      const filtered = employees.filter(employee => employee.last_name.includes(search));
        return filtered.slice(currentPage,currentPage+10);

  }
  const nextPage = () =>{
    if(currentPage < employees.length-10)
      setCurrentPage(currentPage+10);
  }

  const prevPage = () =>{
    if(currentPage > 0)
      setCurrentPage(currentPage-10);
  }
  const onSearchChange = ({target}:ChangeEvent<HTMLInputElement>) =>{
      setCurrentPage(0);
      setSearch(target.value);
  }

  return (
    <>
      {/* <div>
        <input className='form-control' placeholder='Buscar' 
          value={search} 
          onChange={ onSearchChange} />
        
      </div> */}

<InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar"
          value={search} 
          onChange={ onSearchChange}
        />
        <Button variant="primary" onClick={handleShow}>
          Agregar
        </Button>
      </InputGroup>
      
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Birthday</th>
          </tr>
        </thead>
        <tbody>

          {
            filteredEmployee().map(({birthday,id,last_name,name})=>(

              <tr key={id}>
              <th scope="row">{id}</th>
              <td>{last_name}</td>
              <td>{name}</td>
              <td>
              <Moment format="YYYY/MM/DD">{birthday}</Moment>
              </td>
            </tr>
            ))
          }
        </tbody>
       </table>
        <button className='btn btn-primary ' onClick={prevPage}>Prev</button>
        &nbsp;
        <button className='btn btn-primary' onClick={nextPage}>Next</button>

       

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Registro</Modal.Title>
        </Modal.Header>
          <Modal.Body>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required placeholder="Name" onChange={handleNameChange} value={firstName}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>LastName</Form.Label>
                <Form.Control type="text" required placeholder="LastName" onChange={handleLastNameChange} value={lastName}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback>
              </Form.Group>

              <Container>
                    <Row>
                      <Col></Col>
                      <Col xs={10}>
                        <Calendar onChange={setStartDate} value={startDate} />
                        </Col>
                      <Col></Col>
                    </Row>
              </Container>
              

              <div className='pt-2'>
                <Button variant="primary" type='submit'>
                  Enviar
                </Button>
              </div>
              
            </Form>

          </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
       {
        isLoading&&<Loading/>
       }
    </>
  )

}
