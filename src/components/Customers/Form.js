import React from 'react'
//import './App.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Col, Row } from 'reactstrap';





class CustomerForm extends React.Component{
        constructor(props){
            super(props)
            this.state={
                name:props.name?props.name:'',
                email:props.email?props.email:'',
                mobile:props.mobile?props.mobile:''
            }
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
                mobile:this.state.mobile
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
            //         <input type="text" value={this.state.mobile} name="mobile" id="mobile" onChange={this.handleChange}/>
            //         <input type="submit"/>
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
         </Col>
         <Button>Submit</Button>
        </Form>
      </div>


        )
    }
}
export default CustomerForm