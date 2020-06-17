import React from 'react'
import axios from '../../config/axios'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Col, Row } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



class EmployeeForm extends React.Component{
        constructor(props){
            super(props)
            this.state={
                name:props.name?props.name:'',
                email:props.email?props.email:'',
                mobile:props.mobile?props.mobile:'',
                departments:[],
                department:props.department?props.department:''
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
        handleChange=(e)=>{
            this.setState({
                [e.target.name]:e.target.value
            })
        }
        handleSubmit=(e)=>{
            e.preventDefault()
            const formData={
                name:this.state.name,
                email:this.state.email,
                mobile:this.state.mobile,
                department:this.state.department
            }
            this.props.handleSubmit(formData)
        }

    render(){
        return(
            // <div>
            //     <form onSubmit={this.handleSubmit}>
            //         <label htmlFor="name">Name</label>
            //         <input type="text" value={this.state.name} name="name" id="name" onChange={this.handleChange}/><br/>
            //         <label htmlFor="email">Email</label>
            //         <input type="text" value={this.state.email} name="email" id="email" onChange={this.handleChange}/><br/>
            //         <label htmlFor="mobile">Mobile</label>
            //         <input type="text" value={this.state.mobile} name="mobile" id="mobile" onChange={this.handleChange}/><br/>

            //         <label >Department</label>
            //         <select name="department" value={this.state.department} onChange={this.handleChange}>
            //             <option></option>
            //             {
            //                 this.state.departments.map(department=>{
            //                 return   <option key={department._id} value={department._id}>{department.name}</option>
            //                 })
            //             }
            //           </select>
            //          <input type="submit"/>
                
            //     </form>
                
            // </div>
            <div>  
        <Form onSubmit={this.handleSubmit}>
        <Col md={2}>
        <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" value={this.state.name} name="name" id="name" placeholder="enter customername" onChange={this.handleChange}/>
        </FormGroup>
        
        <FormGroup>
        <Label for="email">Email</Label>
        <Input type="text" value={this.state.email} name="email" id="email" placeholder="enter emailId" onChange={this.handleChange}/>
        </FormGroup>
        
        <FormGroup>
        <Label for="mobile">Mobile</Label>
        <Input type="text" value={this.state.mobile} name="mobile" id="mobile" placeholder="enter mobile no" onChange={this.handleChange} />
         </FormGroup>
         <FormGroup>
        <Label for="department">Department</Label>
        <select name="department" value={this.state.department} onChange={this.handleChange}>
                         <option></option>
                         
                        {
                            this.state.departments.map(department=>{
                             return   <option key={department._id} value={department._id}>{department.name}</option>
                             })
                         }
                     </select>
        
         </FormGroup>

         </Col>
         <Button>Submit</Button>
        </Form>
      </div>
 
        )
    }
}
export default EmployeeForm