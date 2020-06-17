import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './empform'

class EmployeeNew extends React.Component{
    handleSubmit=(formData)=>{
        axios.post('/employees',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push('/employees')
            }
        })
    }
    render(){
        return(
            <div>
                <h1>Add Employee</h1>
                <EmployeeForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default EmployeeNew