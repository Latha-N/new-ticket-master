import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'
import { Button } from 'reactstrap';
import { Alert } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';



class CustomerShow extends React.Component{
    constructor(){
        super()
        this.state={
            customer:{}
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customer=response.data
            console.log('latha',response.data)
            this.setState({customer})
        })
    }
    render(){
        console.log(this.props.match.params.id)
        return(
            <Container>

            <div>
            <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
                <h2>Customer show</h2>
                <h2><Alert>Customer Id-{this.props.match.params.id}</Alert></h2>
                <Alert color="primary">{this.state.customer.name}-{this.state.customer.email}-{this.state.customer.mobile}</Alert>
               {/* {<h1>{this.state.customer.name}-{this.state.customer.email}-{this.state.customer.mobile}</h1>} */}
               <Link to={`/customers/edit/${this.props.match.params.id}`}><Button  color="info" size="sm">edit</Button></Link>
               <Link to="/customers"><Button color="secondary" size="sm">back</Button></Link>
               </Col></Row>
            </div>
            </Container>

        )
    }
}
export default CustomerShow