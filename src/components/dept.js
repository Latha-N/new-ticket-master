import React from 'react'
import axios from '../config/axios'

class Departments extends React.Component{
            constructor(){
                super()
                this.state={
                    departments:[],
                    name:''
                }
            }
            componentDidMount(){
                axios.get('/departments',{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })bl
                .then(response=>{
                    const departments=response.data
                    this.setState({departments})
                    console.log(response.data)
                })
            }
            handleSubmit=(e)=>{
                e.preventDefault()
                const formData={
                    name:this.state.name
                }

                axios.post('http://dct-ticket-master.herokuapp.com/departments',formData,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
            })
            .then(response=>{
                console.log('!', response.data)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }else{
                    this.setState(prevState => 
                        {
                            const departments=[...prevState.departments,response.data]
                            return {departments}
                })
                }})
            }
            
         handleChange=(e)=>{
             this.setState({[e.target.name]:e.target.value})
         
            }
    render(){
        return(
            <div>
                    <h1>Departments-{this.state.departments.length}</h1>
                    <ul>
                        {
                            this.state.departments.map((dept)=>{
                            return <li>{dept.name}</li>
                            })
                        }
                        <h1>Add Departments</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
                            <button>Add</button>
                        </form>
                    </ul>

            </div>
        )
    }

}
export default Departments