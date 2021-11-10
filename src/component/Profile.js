import React, { Component } from 'react';

const url="http://localhost:5000/api/auth/userinfo";

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            user:''
        }
    }

    handlelogout = () => {
        sessionStorage.removeItem('ltk');
        this.props.history.push('/login');
    }
    render(){
        if(sessionStorage.getItem('ltk') == null){//if token is not generated then 
            this.props.history.push('/login')       //go to login page
        }
        sessionStorage.setItem('rtk',this.state.user.role)//here we are passing data through role based i.e, (admin or user)
        return(
            <div className="panel panel-waning">
                <div className="panel-heading">
                    Profile
                </div>
                <div className="panel panel-body">
                    <h1>Hi {this.state.user.name}</h1>
                    <h2>Your Email id is {this.state.user.email}</h2>
                    <h2>Your role is {this.state.user.role}</h2>

                    <button className="btn btn-danger" onClick={this.handlelogout}>Logout</button>
                </div>
            </div>
        )
    }

    componentDidMount(){
        fetch(url,{
            method:'GET',
            headers:{
                'x-access-token':sessionStorage.getItem('ltk')
            }
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                user:data
            })
        })
    }
}

export default Profile;