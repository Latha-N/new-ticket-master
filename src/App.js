import React from 'react'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap';
import './css/bootstrap.css'
import { Container, Row, Col } from 'reactstrap';




import Home from "./components/Home"

import Register from "./components/Users/Register"
import Login from "./components/Users/Login"

import CustomerList from "./components/Customers/List"
import CustomerNew from './components/Customers/New'
import CustomerShow from './components/Customers/Show'
import CustomerEdit from './components/Customers/edit'

import Departments from './components/departments/list'

import EmployeeList from './components/employees/employeeList'
import EmployeeNew from './components/employees/empnew'
import EmployeeShow from './components/employees/empshow'
import EmployeeEdit from './components/employees/edit'

import TicketList from './components/tickets/ticketlists'
import TicketNew from './components/tickets/ticketnew'
import TicketShow from './components/tickets/ticketshow'
import TicketEdit from './components/tickets/edit'


function App(props){
    const handleLogout=()=>{
        localStorage.removeItem('authToken')
        window.location.href='/account/login'
    }
    return(
        <BrowserRouter>
        
        
        <div className="container">
            <h1>Ticket Master</h1>
            <Link to="/">Home</Link>
            {
                localStorage.getItem('authToken')?(
                <div>
            
                    <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" href="#"><Link to="/customers">Customer</Link></BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="#"><Link to="/departments">Departments</Link></BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="#"><Link to="/employees">Employees</Link></BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="#"><Link to="/tickets">Tickets</Link></BreadcrumbItem>
                    <Container>
                    <Row>
                    <Col sm={{ size: 'auto', offset: 1 }}></Col>
                    </Row>
                    </Container>
                    <Button outline color="danger"><Link to="#" onClick={handleLogout}>Logout</Link></Button>
                    </Breadcrumb>

                </div>
                ):(
                    <div>
                        <Link to="/account/login">Login</Link>
                        <Link to="/account/register">Register</Link>
                        
                        </div>
                )
            }
            
            <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/account/register" component={Register}/>
            <Route path="/account/login" component={Login}/>

            <Route path="/customers" component={CustomerList} exact={true}/>
            <Route path="/customers/new" component={CustomerNew}/>
            <Route path="/customers/edit/:id" component={CustomerEdit}/>
            <Route path="/customers/:id" component={CustomerShow}/>

            <Route path="/departments" component={Departments} exact={true}/>

            <Route path="/employees" component={EmployeeList} exact={true}/>
            <Route path="/employees/empnew" component={EmployeeNew}/>
            <Route path="/employees/edit/:id" component={EmployeeEdit}/>
            <Route path="/employees/:id" component={EmployeeShow}/>

            <Route path="/tickets" component={TicketList} exact={true}/>
            <Route path="/tickets/ticketnew" component={TicketNew}/>
            <Route path="/tickets/edit/:id"component={TicketEdit}/>
            <Route path="/tickets/:id" component={TicketShow}/>

            
            
            
            </Switch>
        </div>
        </BrowserRouter>
    )
}
export default App

//here we cannot use the