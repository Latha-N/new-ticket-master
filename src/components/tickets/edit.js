import React from 'react'
import axios from '../../config/axios'
import TicketForm from './ticketform'

class TicketEdit extends React.Component{
    constructor(){
        super()
        this.state={
            ticket:{}
        }
    }
    handleSubmit=(formData)=>{
        axios.put(`/tickets/${this.props.match.params.id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const ticket=response.data
            this.props.history.push(`/tickets/${ticket._id}`)
        })
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
            console.log('latha',ticket)
            console.log('ticket')
            this.setState({ticket})
        })
        .catch(err=>{
            alert(err)
        })
    }
    render(){
        return(
            <div>
                <h1>Edit ticket</h1>
                {
                    Object.keys(this.state.ticket).length!=0 && <TicketForm {...this.state.ticket} handleSubmit={this.handleSubmit}/>
                }
            </div>
        )
    }
}
export default TicketEdit