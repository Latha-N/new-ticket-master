import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './form'
import Swal from 'sweetalert2'

import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';






class Departments extends React.Component{
            constructor(){
                super()
                this.state={
                    departments:[],
                    name:''
                }
            }
            componentDidMount(){
                axios.get('/departments',{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(response=>{
                    const departments=response.data
                    this.setState({departments})
                    console.log(response.data)
                })
            }
            handleSubmit=(formData)=>{

                axios.post('/departments',formData,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
            })
            .then(response=>{
                if(response.data.hasOwnProperty('errors')){
                    Swal.fire('Oops!!','there was an error submitting the form','error')

                }else{
                    const department=response.data
                    this.setState(prevState => ({
                            // departments=[...prevState.departments,response.data]
                            departments:prevState.departments.concat(department)
                            }))

                }

                    const department=response.data
                    this.setState(prevState => ({
                            // departments=[...prevState.departments,response.data]
                            departments:prevState.departments.concat(department)
                            }))
                            Swal.fire('Good job','succesfully added department','success')

                })
            }
            handleRemove=(id)=>{
                axios.delete(`/departments/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                 .then(response=>{
                         const department=response.data
                        this.setState(prevState=>({
                            departments:prevState.departments.filter(department=>department._id!==response.data._id)
                        }))
                     
                         
                 })
                }
            
         
    render(){
        return(
            <Container>
                      <Row xs="2">
            <div>
                

                    
                    <h1>Departments-{this.state.departments.length}</h1>
                    <ListGroup>

                    <ul>
                        {
                            this.state.departments.map(department=>{
                            return <li key={department._id}><ListGroupItem>{department.name}<br/>
                             <Button onClick={()=>{this.handleRemove(department._id)}} color="danger" size="sm">remove</Button></ListGroupItem></li>
                            })
                        }
                    </ul>
                    </ListGroup>

                    <DepartmentForm handleSubmit={this.handleSubmit}/>
                    
             </div>
             </Row>

            </Container>

        )
    }

}
export default Departments