import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, RaisedButton, TextField} from 'material-ui';
import axios from 'axios';
import {NavLink, Switch, Route, withRouter} from 'react-router-dom';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
        currentUser: {
          "FirstName":"Andre",
          "LastName":"Maria",
          "Email": "andre@aol.com.br",
          "Password": "123"
        },
        articles: [
          {
            "Name":"Painting 1",
            "Description":"This was something I imagined."
          },
          {
            "Name":"MMMMGGNNGNNGNN",
            "Description":"anfsiuasnbkjulodaso"
          },
          {
            "Name":"aaavavavavvava",
            "Description":"aiubcmkbcvm,cbvm,bmc,vm"
          }
        ],
        users: [
          {
            "FirstName":"Andre",
            "LastName":"Maria",
            "Email": "andre@aol.com.br",
            "Password": "123"
          }
        ]
    }
  }
  
  render(){
    return (
      <div>
        <Header userName={this.state.currentUser.FirstName}></Header>
        
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/signup' render={(props) => ( <Register users={this.state.users}
            updateUsers={(newUser) => this.setState({ users: this.state.users.concat(newUser) })}/> )}/>
        </Switch>

        <Footer></Footer>
      </div>
    );
  }
}


class Header extends Component {

  render() {
    return (
      <div className="navigation-bar">
        <span id="store-name">
          <NavLink to="/" activeClassName="active-link" style={{color:'black', textDecoration:'none'}}>
            Store Name
          </NavLink>
        </span>
        <ul className="navigation-list" >
          <li>Option 1</li>
          <li>{this.props.userName}</li>
          <li>
            <NavLink to="/signup" activeClassName="active-link" style={{color:'black', textDecoration:'none'}}>
              Sign up
            </NavLink>
          </li>
        </ul>
        This is header
      </div>
    )
  }
}

class Footer extends React.Component {
  render(){
    return (
      <div>This is footer</div>
    )
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <img id="dashboard-image" src="https://www.stationgallery.ca/wp-content/uploads/2017/05/Coppa-Gallery-2.jpg"></img>
        <div id="dashboard-text">Your very own <span className="underline-word">art gallery</span>.</div>
        <ListFilters></ListFilters>
        <DashboardList></DashboardList>

      </div>
    )
  }
}

class ListFilters extends React.Component {
  render() {
    return (
      <div className="list-filters-container" >
        <span className="filter-item">
            <label>Name</label>
            <select className="browser-default">
              <option>123</option>
              <option>345</option>
              <option>456</option>
            </select>
        </span>
        <span className="filter-item">
          <label>Description</label>
            <select className="browser-default">
              <option>123</option>
              <option>345</option>
              <option>456</option>
            </select>
        </span>
        <span className="filter-item">
          <label>Category</label>
            <select className="browser-default">
              <option>123</option>
              <option>345</option>
              <option>456</option>
            </select>
        </span>
      </div>
    )
  }
}

class DashboardList extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <DashboardListItem></DashboardListItem>
        </li>
        <li>
          <DashboardListItem></DashboardListItem>
        </li>
        <li>
          <DashboardListItem></DashboardListItem>
        </li>
      </ul>
    )
  }
}

class DashboardListItem extends React.Component {
  render() {
    return (
      <div>This is dashboard list item </div>
    )
  }
}

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div className="fix-space"></div>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Register" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }

  handleClick(event){
    //console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = { 
      "FirstName": this.state.first_name,
      "LastName":this.state.last_name,
      "Email":this.state.email,
      "Password":this.state.password
    }
    this.props.updateUsers(payload);
    window.location.href = "/";
  }

}

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div class="fix-space"></div>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }

  handleClick(event){
    console.log("values",this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = { 
      "first_name": this.state.first_name,
      "last_name":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password
    }
    
  

  }

}



const style = {
  margin: 15,
};

export default withRouter(App);