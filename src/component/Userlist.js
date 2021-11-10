import React,{Component} from 'react';
import UserDisplay from './UserDisplay';

const url = "http://localhost:5000/api/auth/users";

class UserList extends Component {
    constructor(){
        super()

        this.state={
            users:''
        }
    }

    render(){
        if(sessionStorage.getItem('ltk') == null){//if token is not generated then 
            this.props.history.push('/login')       //go to login page
        }
        if(sessionStorage.getItem('ltk') !== null && sessionStorage.getItem('rtk') !== 'Admin'){ //if token is generated but role is not admin then 
            this.props.history.push('/profile')     //goto profile page & if token is generated but role is admin then allow to userslist
        }
        return(
            <div>
                <UserDisplay userData={this.state.users}/>
            </div>
        )
    }
   
    componentDidMount(){
        fetch(url,{method:'GET'})
        .then((response) => response.json())
        .then((data) => {this.setState({users:data})})
    }
}

export default UserList;
