import React from 'react'
import axios from 'axios';

const defaultAvatar='http://localhost:5000/images/uploads/default.jpg';

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file:null,
            url:this.props.avatar
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file).then(res=>{
            this.props.newAvatar('http://localhost:5000/'+res.data.imageUrl);
            this.setState({url:'http://localhost:5000/'+res.data.imageUrl})
        })
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        const url = 'http://localhost:5000/upload';
        const formData = new FormData();
        formData.append('image',file,file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return  axios.post(url, formData,config)
    }
    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h3>Avatar Upload</h3><br/>
                <img src={this.state.url || defaultAvatar}  alt="No Avatar Available"/><br/>
                <input type="file" accept='.jpg, .png, .jpeg' onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}



export default Upload
