import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteEmployeeEntry, employeeList,employeeListById } from '../../actions/index';
import { Link } from "react-router-dom";

class List extends Component {
   constructor(props){
     super(props);
     this.state = { list: [],
                     updatedList: [],
                     hasError: false};
     this.confirmDelete = this.confirmDelete.bind(this);
     this.filterList.bind(this);
     this.sortList.bind(this);
     this.getManagerInfo = this.getManagerInfo.bind(this);
     this.getSubInfo=this.getSubInfo.bind(this)
   }

    componentDidMount(){
        this.getAList();
    }

   async getAList() {

     let results = await this.props.employeeList();
     this.setState({ list : results.payload.data,
                            updatedList:results.payload.data
                            });
   }


   async confirmDelete(e){
     if ( window.confirm('Are you sure you wish to delete this employee?') ) {
          let results = await this.props.deleteEmployeeEntry(e.target.id);
          if( results.payload.data.response === 'success' ) {
              this.getAList();
          }
     }
   }

    filterList = e =>{

        let filteredList = this.state.list;
        filteredList = filteredList.filter(employee=>{
            return employee.name.toLowerCase().indexOf(
                e.target.value.toLowerCase() ) !== -1;
        });

        this.setState({updatedList: filteredList});

    }

    sortList =() =>{

        let sortedList = this.state.list;
        sortedList = sortedList.sort( (a,b)=>{ return a.name.toLowerCase().localeCompare(b.name.toLowerCase())});

        this.setState({updatedList:sortedList});

    }

    async getManagerInfo (e) {

        let results = await this.props.employeeListById(e.target.id);
        this.setState({ updatedList:[results.payload.data]});

    }


    async getSubInfo (e) {
        let ids=e.target.id.split(",");
        let results=[];
        for(let id of ids){       let result= await this.props.employeeListById(id);
                                   results.push(result.payload.data)}
        this.setState({ updatedList:results})
    }

   displayAList(){

     if( Object.keys(this.state.updatedList).length > 0 ) {
         const row = this.state.updatedList.map( ( employee, index ) => {
            let rowNumber = index + 1;
            return <tr key={index}>
                           <th scope="row">{rowNumber}</th>
                           <td><img src={employee.avatar} alt="X" height="30" width="30"/></td>
                           <td>{employee.name}</td>
                           <td>{employee.title}</td>
                           <td>{employee.sex}</td>
                           <td>{employee.start_date.slice(0,10)}</td>
                           <td><a href={"tel:"+employee.office_phone}>{employee.office_phone}</a></td>
                           <td><a href={"tel:"+employee.cell_phone}>{employee.cell_phone}</a></td>
                           <td>{employee.sms}</td>
                           <td><a href={"mailto:"+employee.email}>{employee.email}</a></td>
                           <td id={employee.manager._id} onClick={this.getManagerInfo}>{employee.manager.name}</td>
                           <td id={employee.dr} onClick={this.getSubInfo}>{employee.dr.length}</td>
                           <td><Link className="btn btn-warning" to={"/edit/"+employee._id}>Edit</Link></td>
                           <td><Link id={employee._id}  onClick={this.confirmDelete} className="btn btn-danger" to="/">Delete</Link></td>
                       </tr>
         });
         return (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Avatar</th>
                  <th scope="col" onClick={this.sortList}>Name</th>
                  <th scope="col">Title</th>
                  <th scope="col">Sex</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Office Phone</th>
                  <th scope="col">Cell Phone</th>
                  <th scope="col">SMS</th>
                  <th scope="col">Email</th>
                  <th scope="col">Manager</th>
                  <th scope="col"># of DR</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                { row }
              </tbody>
            </table>
         );
     } else {
         return <p><em>There are no employee listings at the moment.</em></p>;
     }
   }
   render(){
      return(
        <div className="col-lg-12 col-md-12">
          <h2>Employee Listing</h2>
          <input type="text" className="form-control"  placeholder="Search" onChange={this.filterList}/>
          { this.displayAList() }
        </div> 
      );
   }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ employeeList, deleteEmployeeEntry,employeeListById }, dispatch);
};

export default connect(null, mapStateToDispatch)(List);