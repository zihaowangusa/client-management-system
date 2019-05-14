import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { employeeListById,employeeList } from '../../actions/index';
import Entry from './entry';

class Edit extends Component {
   constructor(props){
      super(props);
      this.id = this.props.match.params.id;
      this.state = { row: [],
                     options:[]}
   }
   async getRecord() {
      let all=[];

      let tmp=await this.props.employeeList();
      for(let i of tmp.payload.data){all.push({
         label: i.name,
         value: i._id
      })}


      let result = await this.props.employeeListById(this.id);
      let sub=result.payload.data.dr;
      sub.push(result.payload.data._id);


      let select=all.filter(x=>!sub.includes(x.value));


      this.setState({ row : Object.assign( this.state.row, result.payload.data ),
                             options:select
                     });
   }
   componentDidMount(){
      this.getRecord();
   }
   callForm(){
      if ( Object.keys(this.state.row).length > 0 ) {
           return <Entry mode="edit" row={this.state.row} options={this.state.options} />;
      }
   }
   render(){
      return(
        <div className="col-lg-12 col-md-12">
          { this.callForm() }
        </div> 
      );
   }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ employeeListById,employeeList }, dispatch);
};

export default connect(null, mapStateToDispatch)(Edit);