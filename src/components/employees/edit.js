import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './empform'

class EmployeeEdit extends React.Component{
    constructor(){
        super()
        this.state={
            employee:{}
        }
    }
    handleSubmit=(formData)=>{
        axios.put(`/employees/${this.props.match.params.id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employee=response.data
            this.props.history.push(`/employees/${employee._id}`)
        })
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employee=response.data
            console.log('resp')
            this.setState({employee})
        })
        .catch(err=>{
            alert(err)
        })
    }
    render(){
        return(
            <div>
                <h1>Edit Employee</h1>
                {
                    Object.keys(this.state.employee).length!=0 && <EmployeeForm {...this.state.employee} handleSubmit={this.handleSubmit}/>
                }
            </div>
        )
    }
}
export default EmployeeEdit