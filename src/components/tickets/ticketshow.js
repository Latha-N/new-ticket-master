import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'

class TicketShow extends React.Component{
    constructor(){
        super()
        this.state={
            ticket:{},
            customer: {},
            employee:{}
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/tickets/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const ticket=response.data
            console.log('tt',response.data)
            this.setState({ticket})
            axios.get(`/customers/${ticket.customer}`,{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
                
            })
            .then(response=>{
                const customer=response.data
                console.log('data',customer)
                this.setState({customer})
                axios.get(`/employees/${ticket.employee}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(response=>{
                    const employee=response.data
                    console.log('data',employee)
                    this.setState({employee})
                    
                })

            })
        })
        
    }
    render(){
        console.log('ticket',this.state.ticket)
        console.log('customer',this.state.customer)
        console.log('employee',this.state.employee)
        return(
            <div>
                
                <h1>Ticket Show</h1>
                <h2>Ticket-{this.props.match.params.id}</h2>
                <h1>{this.state.ticket.code}-{this.state.customer.name}-{this.state.ticket.priority}-{this.state.employee.name}</h1>
                <Link to={`/tickets/edit/${this.props.match.params.id}`}>edit</Link>
                <Link to="/tickets">back</Link>
            </div>
        )
    }
}
export default TicketShow
