import React from 'react'
import { Button } from 'reactstrap';


class DepartmentForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:''
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    
       }
       handleSubmit=(e)=>{
           e.preventDefault()
           const formData={
               name:this.state.name
           }
           this.props.handleSubmit(formData)
       }
    render(){
        return(
            <div>
                <h1>Add Departments</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
                           <Button>add department</Button> 
                           {/* <{input type="submit" value="add department"/>} */}
                        </form>

            </div>
        )
    }
}
export default DepartmentForm