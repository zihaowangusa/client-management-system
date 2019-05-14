import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';
import { updateEmployeeEntry, newEmployeeEntry } from '../../actions/index';
import Upload from './upload';




const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    title: Yup.string().required('Title is required!'),
    sex: Yup.string().required('Sex is required!'),
    start_date:Yup.date().required('Start Date is required!'),
    office_phone: Yup.string().required('Office Phone is required!'),
    cell_phone: Yup.string().required('Cell Phone is required!'),
    sms: Yup.string().required('SMS is required!'),
    email: Yup.string().email('Invalid email address!').required('Email address is required!')
});

class Entry extends Component {
   constructor(props){
      super(props);
      this.state = {       id: this.props.row._id ,
                           avatar: this.props.row.avatar,
                           name: this.props.row.name ,
                           title: this.props.row.title , 
                           sex: this.props.row.sex , 
                           start_date: this.props.row.start_date , 
                           office_phone: this.props.row.office_phone , 
                           cell_phone: this.props.row.cell_phone , 
                           sms: this.props.row.sms , 
                           email: this.props.row.email,
                           manager_name: this.props.row.manager,
                           manager_id:this.props.row.manager,
                           dr: this.props.row.dr,
                           redirect: false,
                           options:this.props.options };
       }

   async createUpdateRecord(values){
      let results;
      if( this.props.mode === 'edit' ) {
        results = await this.props.updateEmployeeEntry(values);
        if( results.payload.data.response === 'success' ) {
            this.setState({ redirect: true });
        } else {
            console.log(results.payload.data.response);
        }
      } else {
        results = await this.props.newEmployeeEntry(values);
        if( results.payload.data.response === 'success' ) {
            this.setState({ redirect: true });
        } else {
            console.log(results.payload.data.response);
        }
      }
   }


   newAvatar(avatar){
       this.setState({avatar})
   }



   render(){
      if( this.state.redirect ) {
          return (
            <Redirect to="/" />
          );
      }

      return(
         <div>
           <Upload avatar={this.state.avatar} newAvatar={avatar=>this.newAvatar(avatar)}/><br/><br/>
           <Formik
             initialValues={{

               id:this.state.id ,
               name: this.state.name ,
               avatar: this.state.avatar,
               title: this.state.title , 
               sex: this.state.sex , 
               start_date: this.state.start_date , 
               office_phone: this.state.office_phone , 
               cell_phone: this.state.cell_phone , 
               sms: this.state.sms , 
               email: this.state.email,
               manager:this.state.manager_id



             }}
             validationSchema={validationSchema}
             onSubmit={ values => {
                Object.assign(values,{"avatar":this.state.avatar});
                this.createUpdateRecord(values);
             }}
             render={({ errors, touched,setFieldValue }) => (
               <Form>
                 <div className="row">
                   <div className="col-lg-12 col-md-12">
                   <h2>{ this.props.mode === 'edit' ? 'Edit Employee' : 'Add New Employee' }</h2>
                   </div>
                 </div>

                 <div className="row">
                   <div className={`form-group col-md-6 ${errors.name && touched.name && 'has-error'}`}>
                     <label htmlFor="name">Name:</label>
                     <Field name="name" className="form-control" placeholder="Employee Name" type="text" />
                      { errors.name && touched.name && <span className="help-block">{errors.name}</span> }
                   </div>
                  </div>
                 <div className="row">
                   <div className={`form-group col-md-6 ${errors.title && touched.title && 'has-error'}`}>
                     <label htmlFor="title">Title:</label>
                     <Field name="title" className="form-control" placeholder="Employee Title" type="text" />
                      { errors.title && touched.title && <span className="help-block">{errors.title}</span> }
                   </div>
                  </div>
                <div className="row">
                   <div className={`form-group col-md-6 ${errors.sex && touched.sex && 'has-error'}`}>
                     <label>Sex:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                     <Field name="sex" render={({field}) =>
                         <input type="radio" name={field.name} value="male" checked={field.value === "male"}
                                         onChange={field.onChange}
                                         onBlur={field.onBlur}/>
                      }/>
                     <label htmlFor="male">Male</label>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <Field name="sex" render={({field}) =>
                         <input type="radio" name={field.name} value="female" checked={field.value === "female"}
                                         onChange={field.onChange}
                                         onBlur={field.onBlur}/>
                      }/> <label htmlFor="female">Female</label>
                      { errors.sex && touched.sex && <span className="help-block">{errors.sex}</span> }
                   </div>
                </div>
                <div className="row">
                   <div className={`form-group col-md-6 ${errors.start_date && touched.start_date && 'has-error'}`}>
                     <label htmlFor="start_date">Start Date:</label>
                     <Field name="start_date" className="form-control" placeholder="Employee Start Date" type="date" />
                      { errors.start_date && touched.start_date && <span className="help-block">{errors.start_date}</span> }
                   </div>
                  </div>
                <div className="row">
                   <div className={`form-group col-md-6 ${errors.office_phone && touched.office_phone && 'has-error'}`}>
                     <label htmlFor="office_phone">Office Phone:</label>
                     <Field name="office_phone" className="form-control" placeholder="Employee Office Phone" type="text" />
                      { errors.office_phone && touched.office_phone && <span className="help-block">{errors.office_phone}</span> }
                   </div>
                  </div>
                <div className="row">
                   <div className={`form-group col-md-6 ${errors.cell_phone && touched.cell_phone && 'has-error'}`}>
                     <label htmlFor="cell_phone">Cell Phone:</label>
                     <Field name="cell_phone" className="form-control" placeholder="Employee Cell Phone" type="text" />
                      { errors.cell_phone && touched.cell_phone && <span className="help-block">{errors.cell_phone}</span> }
                   </div>
                  </div>
                <div className="row">
                   <div className={`form-group col-md-6 ${errors.sms && touched.sms && 'has-error'}`}>
                     <label htmlFor="sms">SMS:</label>
                     <Field name="sms" className="form-control" placeholder="Employee SMS" type="text" />
                      { errors.sms && touched.sms && <span className="help-block">{errors.sms}</span> }
                   </div>
                  </div>
                <div className="row">
                   <div className={`form-group col-md-6 ${errors.email && touched.email && 'has-error'}`}>
                     <label htmlFor="email">Email:</label>
                     <Field name="email" className="form-control" placeholder="Employee Email" type="email" />
                      { errors.email && touched.email && <span className="help-block">{errors.email}</span> }
                   </div>
                  </div>

                <div className="row">
                   <div className={`form-group col-md-6 ${errors.manager && touched.manager && 'has-error'}`}>
                     <label htmlFor="manager">Manager:</label>
                     <Field component="select" name="manager" placeholder="Please Select a Manager:" onChange={e=>{ var index=e.target.options.selectedIndex;
                                                                                                                    setFieldValue("manager",e.target.options[index].id) }} >
                         {this.state.options.map(option => (
                             <option id={option.value}>
                                 {option.label}
                             </option>
                         ))}
                     </Field>
                      { errors.manager && touched.manager && <span className="help-block">{errors.manager}</span> }
                   </div>
                </div>

                 <div className="row">
                   <div className="col-lg-12 col-md-12">
                      <button type="submit" className="btn btn-primary">Submit</button>
                   </div>
                 </div>
               </Form>
             )} />
         </div>
      );
   }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ updateEmployeeEntry, newEmployeeEntry }, dispatch);
};

export default connect(null, mapStateToDispatch)(Entry);