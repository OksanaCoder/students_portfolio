import React, { Component } from 'react';
import { Form, Button, Table, Modal, Card } from 'react-bootstrap'
import ModalProject from './ModalProject'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import Projects from './Projects'
// import LoadingSpinner from './Components/LoadingSpinner'

class Students extends Component {
    constructor(props){
        super(props)
        this.state={
  

            data : [],
            projects: [],
            show: false,
            show1: false,
            Mshow: false,
        
             student : {
              name: '',
              surname: '',
              email: '',
              dateOfBirth: null,
              country : '',
             submitted: false,
        }
    }
 
  }

    componentDidMount = async () => {
      const resp = await fetch('http://localhost:3001/users')
      const result =  await resp.json()
      //console.log(result)
      this.setState({
   
        data : result.users
        
      })
      console.log("props from student", this.props.match)
    }

    onChangeStudent =event => {
      console.log(event.target.name, event.target.value)
      this.setState({
        ...this.state,
        student: {
          ...this.state.student,
          [event.target.name] : event.target.value
        }
        
      })
    }

    onChange = (event) => {
      console.log(event.target.name, event.target.value)
      this.setState({
          student: {
            ...this.state.student,
            [event.target.name] : event.target.value
          }
          
      })
  }

    saveStudeent = async (event) =>{
      event.preventDefault()
       this.setState({ submitted: true})
      const data =  {
        name: this.state.student.name,
        surname: this.state.student.surname,
        email: this.state.student.email,
        dateOfBirth : this.state.student.dateOfBirth,
        country: this.state.student.country
    }
      const resp = await fetch('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify(data ),
        headers: {
            'Content-Type' : 'application/json'
        }
      })
      if(resp.ok) {
        alert('New student added')
      }
      //console.log(resp)
    }
    delItem = async (id) => {
      // event.preventDefault()
      
      const resp = await fetch('http://localhost:3001/users/' + id, {
        method: 'DELETE',
       
      })
      if(resp.ok){
        alert("deleted")
      }
    }
   handleClose =() => {
      this.setState({ show: false})
   }
   handleClose1 =() => {
    this.setState({ show1: false})
 }
   
   openAndEdit = async (id) => {
  
    const student = this.state.data.find(student => student._id === id)
    this.setState({
      show: true,
      student: student
      // data : result
    })
   }
    
   
   
   editItem = async (id) => {
      const udatedData =  {
        _id: id,
        name: this.state.student.name,
        surname: this.state.student.surname,
        email: this.state.student.email,
        dateOfBirth : this.state.student.dateOfBirth,
        country: this.state.student.country
    }
      // this.setState({  data: udatedData  })
      // event.preventDefault()
      const resp = await fetch('http://localhost:3001/users/' +  id, {
        method: 'PUT',
        body: JSON.stringify(udatedData ),
        headers: {
            'Content-Type' : 'application/json'
        }
      })
      //find the element into this.state.data
      const oldStudent = this.state.data.find(x => x._id === id)
      const index = this.state.data.indexOf(oldStudent)
      const students = this.state.data
      students[index] =udatedData
      //replace it and update the state
      this.setState({
        data: students, 
        show: false
      })
    }
  
    openProject  = async (id) => {
        const resp = await fetch('http://localhost:3001/users/' + id )
        const result =  await resp.json()
        //console.log(result)
        this.setState({
          projects : result,
          show1: true
        })
        console.log(result)
      
      }
   
  render() {
    console.log(this.state.projects)
    // console.log("props from student", this.props)
    return (
      <>
 

 
      <div>
         <div className='container-fluid back-jumbo' style={{position:'relative', padding: '0px 100px'}}>
           <div className='descr' style={{fontStyle:'italic', position:'absolute', top: '350px', left: '300px'}}>
           <h5 >Strivers</h5>
           <h4 style={{fontSize: '30px'}}>Portfolio</h4>
           </div> 
           
         {/* <Form className='mt-4 formSub' onSubmit={this.saveStudeent}>
         <Form.Group>
           <Form.Label>Name</Form.Label>
           <Form.Control name='name' onChange={this.onChange} value={this.state.student.name} type="text" placeholder="Enter name" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Surname</Form.Label>
           <Form.Control name='surname' onChange={this.onChange} value={this.state.student.surname} type="text" placeholder="Enter surname" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Email</Form.Label>
           <Form.Control name='email' onChange={this.onChange} value={this.state.student.email} type="email" placeholder="Enter email" />
           <Form.Text className="text-muted">
             We'll never share your email with anyone else.
           </Form.Text>
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Date of Birth</Form.Label>
           <Form.Control  name='dateOfBirth' onChange={this.onChange} value={this.state.student.dateOfBirth} type="date" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Country</Form.Label>
           <Form.Control name='country' onChange={this.onChange} value={this.state.student.country} type="text" placeholder="Enter country" />
         </Form.Group>
       
         <Button variant="danger" type="submit">
           Submit
         </Button>
       </Form> */}

    

   
       
       { this.state.data.map((item, i) => {
          

       return (
         <>
<div className='row'>
  
      <Card className='col-sm-12 col-md-2 col-lg-2 card-portf' style={{width: '10%'}}>

      <Link to={'/details/' + item._id} ><Card.Img variant="top" className='imgs' src={item.img} onClick={() => this.openProject(item._id)}/></Link>
       
        <Card.Body>
          <Card.Title style={{fontStyle:'italic'}}>{item.name} {item.surname}</Card.Title>
         <Button variant='danger' onClick={() => this.delItem(item._id)}>Remove</Button>
         <Button variant='success' onClick={() => this.openAndEdit(item._id)}>Edit</Button>
        
        <Link to={'/projects'} ><Button variant='dark'>Projects</Button></Link>
          {/* <Router>
               <Link to='/projects' ><Button variant='dark'>Projects</Button></Link> 

              
          </Router> */}

         
      {/* <Button variant='dark' onClick={() => this.openProject(item._id)}>Projects</Button>
       */}
    
     
        {/* <Router>
           <Route path="/projects" component={Projects} />
        </Router> */}
       {/* <Link to='/projects' ><Button variant='dark'>Projects</Button></Link> */}
          {/* <Button variant="primary" onClick={() => this.openProject(item._id)}>More...</Button> */}
        </Card.Body>
      </Card>
      </div>
        <Modal show={this.state.show} className='modal-wind'  onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form className='mt-4' onSubmit={this.saveStudeent}>
         <Form.Group>
           <Form.Label>Name</Form.Label>
           <Form.Control name='name' onChange={this.onChangeStudent} value={this.state.student.name} type="text" placeholder="Enter name" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Surname</Form.Label>
           <Form.Control name='surname' onChange={this.onChangeStudent} value={this.state.student.surname} type="text" placeholder="Enter surname" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Email</Form.Label>
           <Form.Control name='email' onChange={this.onChangeStudent} value={this.state.student.email} type="email" placeholder="Enter email" />
           <Form.Text>
             We'll never share your email with anyone else.
           </Form.Text>
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Date of Birth</Form.Label>
           <Form.Control name='dateOfBirth' onChange={this.onChangeStudent} value={this.state.student.dateOfBirth} type="date" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Country</Form.Label>
           <Form.Control name='country' onChange={this.onChangeStudent} value={this.state.student.country} type="text" placeholder="Enter country" />
         </Form.Group>
       
        
       </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleClose() }>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.editItem(item._id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.show1} onHide={this.handleClose1}>
        <Modal.Header closeButton>
      <Modal.Title>ABOUT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className='list-unstyled'>
            <li>Name: {item.name}</li>
            <li>Surname: {item.surname}</li>
            <li>Email:  {item.email}</li>
            <li>Country: {item.country}</li>
            <li>Date of birth {item.dateOfBirth}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <ModalProject show={this.state.projects} showModal={this.state.Mshow} /> */}
        </>
        
  )
       }
     )
      }

</div>
    
       </div>
    

      </>
     );
  }
 
}

export default Students;
