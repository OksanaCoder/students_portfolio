import React, {Component} from 'react'
import { Col, Row , Modal, Button} from 'react-bootstrap'

export default class Projects extends Component {
    state = {
        show: false,
        show1: false,
        show2: false,
        show3: false

    }
    openModal = () => {
        
        this.setState({ show: true })
    }
    openModal1 = () => {
        this.setState({ show1: true })
    }
    openModal2 = () => {
        this.setState({ show2: true })
    }
    openModal3 = () => {
        this.setState({ show3: true })
    }
    handleClose = () =>{
        this.setState({ show: false })
    }
    handleClose1 = () =>{
        this.setState({ show1: false })
    }
    handleClose2 = () =>{
        this.setState({ show2: false })
    }
    handleClose3 = () =>{
        this.setState({ show3: false })
    }
    render() {
        return(
            <>
            <div className='container'>
                <h5 style={{color: '#F9AF65'}}>Projects</h5>
                <h3>Check Out Some Works.</h3>
                <Row className='justify-content-ld-center no-gutters mt-5'>
                    <Col lg={4}><img style={{padding: '30px'}} className='img-proj' src='https://www.crocosoft.ru/images/TechIcons/postgre-sql.png'/></Col>
                    {/* <a className="overlay">	                  	           
	                     <div className="folio-item-table">
	                     	<div className="folio-item-cell">
		     					       <h3 className="folio-title">Responsive template</h3>	     					    
		     					    	 <span className="folio-types">Development Technology: HTML5, CSS3, JS, jQuery, Gulp, Sass</span>
		     					   </div>	                      	
	                     </div>                    
	                  </a> */}
                    <Col lg={8}><img onClick={this.openModal3} className='img-proj' src='https://miro.medium.com/max/3000/1*3f7gyFnHcBqrwXUe7bDILw.jpeg'/></Col>
                    
                    <Modal show={this.state.show3} onHide={this.handleClose3}>
                    <Modal.Header closeButton>
                    <Modal.Title>PORTFOLIO TEMPLATE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><a style={{ color: '#fff', textDecoration: 'none'}} href='https://oksanacoder.github.io/Responsive-landing-page.github.io/'>Click here for details</a></Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose3}>
                        Close
                    </Button>
                  
                    </Modal.Footer>
                </Modal>
                   
                </Row>
                <Row className='no-gutters'>
                <Col lg={4}><img  onClick={this.openModal2} className='img-proj' src='https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'/></Col>
                
                <Modal show={this.state.show2} onHide={this.handleClose2}>
                    <Modal.Header closeButton>
                    <Modal.Title>HTML Markup</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><a style={{ color: '#fff', textDecoration: 'none'}} href='https://oksanacoder.github.io/email-butterfly-verstka.github.io/'>Click here for details</a></Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose2}>
                        Close
                    </Button>
                  
                    </Modal.Footer>
                </Modal>
                
                <Col lg={4}><img className='img-proj'  onClick={this.openModal}  src='https://javascript30.com/images/favion-JS3.png'/></Col>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>30 days of JS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><a style={{ color: '#fff', textDecoration: 'none'}} href='https://oksanacoder.github.io/piano-keybord.github.io/'>Click here for details</a></Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                  
                    </Modal.Footer>
                </Modal>
                <Col lg={4}><img onClick={this.openModal1} className='img-proj' src='https://cdn4.vectorstock.com/i/1000x1000/90/18/programmer-coder-glasses-html-markup-language-vector-10199018.jpg'/></Col>
                
                
                <Modal show={this.state.show1} onHide={this.handleClose1}>
                    <Modal.Header closeButton>
                    <Modal.Title>UNIQUE TECH</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><a style={{ color: '#fff', textDecoration: 'none'}} href='https://mateacademy-fe-study.github.io/crazy-octopus.github.io/build/index.html'>Click here for details</a></Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose1}>
                        Close
                    </Button>
                  
                    </Modal.Footer>
                </Modal>
                    </Row>
            </div>
            </>

        )
    }
}