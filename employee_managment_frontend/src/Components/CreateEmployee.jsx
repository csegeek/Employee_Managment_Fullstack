import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService'
import { withRouter } from './withRouter'
 class CreateEmployee extends Component {
      constructor(props){
          super(props)
          this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.firstNameHandler=this.firstNameHandler.bind(this);
        this.lastNameHandler=this.lastNameHandler.bind(this);
        this.emailHandler=this.emailHandler.bind(this);
      }
      componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId
                });
            });
        }        
    }

    saveOrUpdateEmployee=(e)=>{
      e.preventDefault();
      let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
      console.log('employee => ' + JSON.stringify(employee));
      
      if(this.state.id === '_add'){
        EmployeeService.createEmployee(employee).then(res =>{
            this.props.navigate('/');
        });
    }else{
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.navigate('/');
        });
    }
}
     


      
      firstNameHandler=(e)=>{
          this.setState({firstName:e.target.value});
      }
      lastNameHandler=(e)=>{
        this.setState({lastName:e.target.value});
      }
      emailHandler=(e)=>{
        this.setState({emailId:e.target.value});
      }

      getTitle(){
        if(this.state.id === '_add'){
            return <h3  className='heading'>Please Fill Employee Details. </h3>
        }else{
            return <h3  className='heading'>Please Fill Updated Details</h3>
        }

      }
      cancel=()=>{
        this.props.navigate('/');
      }
  render() {
    return (
      <div className="createEmployee">
                <br></br>
                 {
                   this.getTitle()
                 }
                <div className='form'>
                        <form>
                          <div className="mb-3 mt-3">
                            <label  className="form-label">FirtsName</label>
                            <input type="text" value={this.state.firstName}  className="form-control"  placeholder="Enter FirstName" onChange={this.firstNameHandler} />
                          </div>
                          <div className="mb-3">
                            <label  className="form-label">LastName</label>
                            <input type="text"  value={this.state.lastName} className ="form-control"  placeholder="Enter LastName" onChange={this.lastNameHandler}/>
                          </div>
                          <div className="mb-3">
                            <label  className="form-label">Email:</label>
                            <input type="text" value={this.state.emailId} className="form-control"  placeholder="Enter EmailId"  onChange={this.emailHandler}/>
                          </div>
                         
                          <button type="submit" className="btn btn-primary"onClick={this.saveOrUpdateEmployee}>Submit</button>
                          <button  className="btn btn-danger" onClick={this.cancel}  style={{margin:"10px"}}> Cancel </button>
  
                        </form>
                        </div>
      </div>
    )
  }
}
export default withRouter(CreateEmployee);