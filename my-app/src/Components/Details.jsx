import React, {Component} from 'react'
import { Row, Col} from 'react-bootstrap'
import InstagramIcon from '@material-ui/icons/Instagram';
import ReactDOM from 'react-dom';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import LoadingSpinner from './LoadingSpinner'


// const mainBag = {
//     backgroundImage: url('https://ak.picdn.net/shutterstock/videos/14001131/thumb/1.jpg'),
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
// }

export default class Details  extends Component {
    state = {
        student : []
    }

    // url = 'http://localhost:3001/users'
    
    
    componentDidMount = async () => {
    //    document.body.style={mainBag}
        const resp = await fetch('http://localhost:3001/users' + '/' + this.props.match.params.id) 
        const obj = await resp.json()
        this.setState({ student : obj})
    }
   render() {
    // console.log(this.state.student)
   
    return(
        
        < >
    
            <div className='container mt-4'>
                <Row style={{marginTop: '200px'}}>
                    <Col lg={12} md={12} sm={12} style={{textAlign: 'center'}}>
                        <img style={{marginBottom: '20px', width: '100px', border: '3px solid #fff', borderRadius:'50%'}} src={this.state.student.img} />
                        <h5>I'm {this.state.student.name}</h5>
                        <h5>Live in {this.state.student.country}</h5>
                        <h5  className='mb-3'>Contact me on -> {this.state.student.email}</h5>
                        <LinkedInIcon color='secondary' className='mr-3'/>
                        <InstagramIcon color='primary' className='mr-3'/>
                        <FacebookIcon />
                    </Col>
                  
                </Row>
            </div>
  
            </>
        )
   }
}