import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class TicketList extends React.Component{
    constructor(){
        super()
        this.state={
            tickets:[],
            departments:[],
            customers:[],
            //employees:[]
        }
    }
    componentDidMount(){
        axios.get('/tickets',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const tickets=response.data
            this.setState({tickets })
            console.log(response.data)
        })
        .catch(err => alert(err))
        axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log('resp', response.data)
            const departments=response.data
            this.setState({departments})
        })
        // axios.get('/employees',{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     const employees=response.data
        //     this.setState({employees})
        // })
        axios.get('/customers',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customers=response.data
            this.setState({customers})
        })
        .catch(err => alert(err))
    }
    handleRemove=(id)=>{
        axios.delete(`/tickets/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState(prevState=>({
                    tickets:prevState.tickets.filter(ticket=>ticket._id!==response.data._id)
                }))
        })
    }
    render(){
        console.log('dep', this.state.departments)
        return(
            <div>
            <h1>Tickets-{this.state.tickets.length}</h1>
            
            <ul>
                {
                    this.state.tickets.map(ticket=>{
                        return<li key={ticket._id}>{ticket.code}-
                         {/* {this.state.customers.length>0 &&
                        this.state.customers.find(customer=>customer._id===ticket.customer).name}   */}
                        {/* {-{ticket.priority}-} */}
                        {/* {this.state.departments.length > 0 && 
                        this.state.departments.find(dept=>dept._id===ticket.department).name} */}
                        <Link to={`tickets/${ticket._id}`}><button >show</button></Link>
                        <button onClick={()=>{this.handleRemove(ticket._id)}}>remove</button></li>
                    
                    })
                }
            </ul>
            <Link to="/tickets/ticketnew">Add Ticket</Link>
            </div>
        )
    }
}
export default TicketList

