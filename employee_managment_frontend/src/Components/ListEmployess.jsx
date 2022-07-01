import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService'
import { withRouter } from './withRouter';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

 class ListEmployees extends Component {
       constructor(props){
           super(props)
           this.state={
          employees:[]
           }

       }
       componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data}); });
    }

     addEmployee=()=>{
         this.props.navigate('/add-employee/_add');
     }
    
     editEmployee(id){
        this.props.navigate(`/add-employee/${id}`);
    }
     deleteEmployee(employeeId){
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>this.confirmDelete(employeeId)
              },
              {
                label: 'No',
                onClick: () => this.props.navigate("/")
              }
            ]
          });
        
     }

     confirmDelete(employeeId){
         EmployeeService.deleteEmployee(employeeId);
         this.setState({employees: this.state.employees.filter(employee => employee.id !== employeeId)});

     }

     viewEmployee(id){
        this.props.navigate(`/view-employee/${id}`);
    }



   render() {
   
       {
           console.table(this.state.employees);
       }

    return (
        <div>
            <div className='container'>
            <button className='btn btn-info' onClick={this.addEmployee} style={{ display:"flex",marginLeft: "10px"}} > Add Employee</button>
            </div>
       
        <h2 className='heading'> Employee List</h2>       
        <div className='row'>
        <div class="p-3 mb-2 bg-transparent text-dark">
            {/* <table className='table table-info table-striped table-border table-responsive'> */}
            <table className='table' >
                <thead>
                    <tr>
                        <th>Emlployee First Name</th>
                        <th>Emlployee LastName</th>
                        <th>Emlployee Email-Id</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.employees.map(  employee=>
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                </td>
                            </tr>

                        )
                    }
                </tbody>
            </table>
            </div>
        </div>
        </div>
    
    )
  }
}
export default  withRouter(ListEmployees);