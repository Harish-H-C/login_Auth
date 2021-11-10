import React,{Component} from 'react';
//import {Link} from 'react-router-dom';

const url = "http://localhost:5000/api/auth/login";

class LoginComponent extends Component {
    constructor(){
        super()

        this.state={
            email:'',
            password:'',
        }
    }

    handleChangeEmail = (event) => {
        this.setState({email:event.target.value})
    }

    handleChangePassword = (event) => {
        this.setState({password:event.target.value})
    }


    handleSubmit = () => {
        console.log(this.state)
        fetch(url,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(this.state)
        })
       .then((res) => res.json())
    //    .then((data) => {
    //        console.log(data)//to  check whether token is generated or not when correct email & password enterd
    //    })
       .then((data) => {
           sessionStorage.setItem('ltk',data.token)//if token is generated allow to profile page 
           this.props.history.push('/profile')
        //    alert("login Successfully")
       })
       .catch((data) => {
           console.log(data)
           alert("Username/Password is Invalid")
        })    
    }

    render(){
        return(
            <div className="container">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        Login
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" value={this.state.email} className="form-control" 
                            onChange={this.handleChangeEmail}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" value={this.state.password} className="form-control"
                             onChange={this.handleChangePassword}/>
                        </div>
                        <button className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent;