import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';




class EmployeeList extends React.Component{
    constructor(){
        super()
        this.state={
            employees:[]
        }
    }
    componentDidMount(){
        axios.get('/employees',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employees=response.data
            console.log(response.data)
            this.setState({employees})
            console.log(response.data)
        })
    }
    handleRemove=(id)=>{
        axios.delete(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
         .then(response=>{
         this.setState(prevState=>({
                employees:prevState.employees.filter(employee=>employee._id!==response.data._id)
            }))
         })
        }
    
    render(){
        return(
            <Container>
                      <Row xs="2">
            <div>
                <h2>Employees Lists-{this.state.employees.length}</h2>
                <ListGroup>

                <ul>
                
                    {
                        this.state.employees.map(emp=>{
                        return <li key={emp._id}><ListGroupItem><Link to={`/employees/${emp._id}`}>{emp.name}</Link><br/>
                        {/* {-{emp.email}-{emp.mobile}-
                         { emp.department ? emp.department.name : 'N/A' }} */}
                         <Link to={`/employees/${emp._id}`}><Button color="info" size="sm">show</Button></Link> <Button onClick={()=>
                            {this.handleRemove(emp._id)}} color="danger" size="sm">remove</Button></ListGroupItem></li>
                        
                        })
                         }
    
                </ul>
                </ListGroup>
                <Link to="/employees/empnew"><Button color="primary" size="sm" active>Add Employees</Button></Link>
            </div>
            </Row>

            </Container>

        )
    }
}
export default EmployeeList