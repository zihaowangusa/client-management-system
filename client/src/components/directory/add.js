import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {employeeList} from "../../actions";
import Entry from './entry';



class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {options: []}

    }

    async getRecord() {
        let all=[];

        let tmp=await this.props.employeeList();
        for(let i of tmp.payload.data){all.push({
            label: i.name,
            value: i._id
        })}


        this.setState({options:all})
    }

    componentDidMount() {
        this.getRecord();
    }

    callForm(){
        if ( Object.keys(this.state.options).length > 0 ) {
            return <Entry mode="new" row="[]" options={this.state.options}/>;
        }
    }

    render() {
        return (
            <div className="col-lg-12 col-md-12">
                { this.callForm() }
            </div>

        );
    }
}

const mapStateToDispatch = (dispatch) => {
    return bindActionCreators({ employeeList }, dispatch);
};

export default connect(null, mapStateToDispatch)(Add);


