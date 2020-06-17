import React from 'react'
import axios from '../../config/axios'
//import {Link} from 'react-router-dom'
//import styles from './mystyle.module.css'; 
//import Button from 'react-bootstrap/Button';
import { Button } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Badge } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';



import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';


class CustomerList extends React.Component{
    constructor(){
        super()
        this.state={
            customers:[]
        }
    }
    componentDidMount(){
        axios.get('/customers',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            } 
        })
        .then(response=>{
            const customers=response.data
            this.setState({customers })
            console.log(response.data)
        })
        .catch(err => alert(err))
    }
    handleRemove=(id)=>{
    const confirmRemove=window.confirm("Are you sure?")
        if(confirmRemove){
        axios.delete(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState(prevState=>({
                    customers:prevState.customers.filter(customer=>customer._id!==response.data._id)
                }))
        })
    
        .catch(err => alert(err))
    }
}
    render(){
        return(
            <Container>
                        <Row xs="2">

                <div>
                <h1> <Badge color="success">Customer List-{this.state.customers.length}</Badge></h1>
                <ListGroup>
                <ul>
                    {
                            this.state.customers.map(customer=>{
                            return<li key={customer._id}><ListGroupItem><Link to={`/customers/${customer._id}`}>{customer.name}<br/>
                            </Link> <Link to={`/customers/${customer._id}`}>
                            <Button  color="info" size="sm">show</Button></Link> <Button onClick={()=>{this.handleRemove(customer._id)}}
                            color="danger" size="sm">remove</Button></ListGroupItem></li>
                        
                        })
                    }
                </ul>
                </ListGroup>
                <Link to="/customers/new"><Button color="primary" size="sm" active>Add Customer</Button></Link>
                </div>
                </Row>

            </Container>

        )
    }
}
export default CustomerList