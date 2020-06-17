import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'

class EmployeeShow extends React.Component{
    constructor(){
        super()
        this.state={
            employees:{}
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employees=response.data
            console.log(response.data)
            this.setState({employees})
        })
    }
    render(){
        console.log(this.state)
        return(
            <div>
                
                <h1>Employee Show</h1>
                <h2>Employee-{this.props.match.params.id}</h2>
                <h1>{this.state.employees.name}-{this.state.employees.email}-{this.state.employees.mobile}-
                {this.state.employees.department?this.state.employees.department.name:'n/a'}</h1>
                <Link to={`/employees/edit/${this.props.match.params.id}`}><button>edit</button></Link>
                <Link to="/employees" >back</Link>
            </div>
        )
    }
}
export default EmployeeShow