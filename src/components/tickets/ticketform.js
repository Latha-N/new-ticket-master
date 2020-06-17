import React from 'react'
import axios from '../../config/axios'
import  MultiSelectReact  from 'multi-select-react';

class TicketForm extends React.Component{
        constructor(props){
            super(props)
            this.state={
                code:props.code?props.code:'',
                employees:[],
                employee:props.employee?props.employee:'',
                departments:[],
                department:props.department?props.department:'',
                message:'',
                priorities:['High','Medium','Low'],
                priority: props.priority?props.priority:'',
                customers:[],
                customer:props.customer?props.customer:''
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
            axios.get('/employees',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                const employees=response.data
                this.setState({employees})
                console.log('employee',response.data)
            })
            axios.get('/customers',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                const customers=response.data
                this.setState({customers})
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
                code:this.state.code,
                customer:this.state.customer,
               // employees:this.state.employee,
                department:this.state.department,
                message:this.state.message,
                priority: this.state.priority 
            }
            this.props.handleSubmit(formData)
        }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="code">Code</label>
                    <input type="text" value={this.state.code} name="code" id="code" onChange={this.handleChange}/><br/>

                    <label >Customer</label>
                    <select  name="customer" value={this.state.customer} onChange={this.handleChange}>
                        <option></option>
                        {
                            this.state.customers.map(customer=>{
                            return <option key={customer._id} value={customer._id}>{customer.name}</option>
                            })
                        }

                    </select>

                    

                    <label>Employees</label>
                    <select  name="employee" onChange={this.handleChange}>
                        <option value=''>SELECT</option>
                        {
                            this.state.employees.map(emp=>{
                            return <option key={emp._id} value={emp._id}>{emp.name}</option>
                            })
                        }
                    </select>

                    <label >Department</label>
                    <select name="department" value={this.state.department} onChange={this.handleChange}>
                        <option></option>
                        {
                            this.state.departments.map(department=>{
                            return   <option key={department._id} value={department._id}>{department.name}</option>
                            })
                        }
                    </select>

                    <label>Message<textarea name="message" value={this.state.message} onChange={this.handleChange}/></label>
                        <ul>
                            {
                                this.state.priorities.map(pri=>{
                                return <li key={pri._id}><input value={pri} onChange={this.handleChange} name="priority" type="radio"/>{pri}</li>
                                })
                            }
                            </ul>
                        <input type="submit"/>
                </form>
            </div>
 
        )
    }
}
export default TicketForm