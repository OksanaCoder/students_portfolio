import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Table } from 'react-bootstrap'

class App extends Component {
  state = {
    data : [],

      name: '',
      surname: '',
      email: '',
      dateOfBirth: null,
      country : '',
     submitted: false
  }
  
    componentDidMount = async () => {
      const resp = await fetch('http://localhost:3001/users')
      const result =  await resp.json()
      console.log(result)
      this.setState({
        data : result
      })

    }

    onChange = (event) => {
      this.setState({
          [event.target.name] : event.target.value
      })
  }

    saveStudeent = async (event) =>{
      event.preventDefault()
       this.setState({ submitted: true})
      const data =  {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        dateOfBirth : this.state.dateOfBirth,
        country: this.state.country
    }
      const resp = await fetch('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify(data ),
        headers: {
            'Content-Type' : 'application/json'
        }
      })
      console.log(resp)
    }
    delItem = async (event) => {
      event.preventDefault()
      const resp = await fetch('http://localhost:3001/users', {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
      })
    }
    editItem = async (event) => {
      event.preventDefault()
      const resp = await fetch('http://localhost:3001/users', {
        method: 'EDIT',
        headers: {
            'Content-Type' : 'application/json'
        }
      })
    }
  render() {
    console.log(this.state.name)

    return (
      <>
         <div className='container mt-5'>
           <h5><i>Add new user</i></h5>
         <Form className='mt-4 formSub' onSubmit={this.saveStudeent}>
         <Form.Group>
           <Form.Label>Name</Form.Label>
           <Form.Control name='name' onChange={this.onChange} value={this.state.name} type="text" placeholder="Enter name" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Surname</Form.Label>
           <Form.Control name='surname' onChange={this.onChange} value={this.state.surname} type="text" placeholder="Enter surname" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Email</Form.Label>
           <Form.Control name='email' onChange={this.onChange} value={this.state.email} type="email" placeholder="Enter email" />
           <Form.Text className="text-muted">
             We'll never share your email with anyone else.
           </Form.Text>
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Date of Birth</Form.Label>
           <Form.Control name='dateOfBirth' onChange={this.onChange} value={this.state.dateOfBirth} type="date" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Country</Form.Label>
           <Form.Control name='country' onChange={this.onChange} value={this.state.country} type="text" placeholder="Enter country" />
         </Form.Group>
       
         <Button variant="danger" type="submit">
           Submit
         </Button>
       </Form>

       <Table striped bordered hover className='mt-5'>
      
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Surname</th>
      <th>Email</th>
      <th>Date of Birth</th>
      <th>Country</th>
      <th></th>
      <th></th>
    </tr>


   
       
       { this.state.data.map((item, i) => {

       return (
          <tr>
        <td>{i+1}</td>
        <td>{item.name}</td>
        <td>{item.surname}</td>
        <td>{item.email}</td>
        <td>{item.dateOfBirth}</td>
        <td>{item.country}</td>
        <td><Button variant='danger'>Remove</Button>{this.delItem}</td>
        <td><Button variant='success'>Edit</Button>{this.editItem}</td>
        </tr>
  )
       }
     )
      }

  
</Table>
       </div>
      </>
     );
  }
 
}

export default App;
