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
            "Description":"This was something I imagined.",
            "ImageUrl":""
          },
          {
            "Name":"MMMMGGNNGNNGNN",
            "Description":"anfsiuasnbkjulodaso",
            "ImageUrl":""
          },
          {
            "Name":"aaavavavavvava",
            "Description":"aiubcmkbcvm,cbvm,bmc,vm",
            "ImageUrl": ""
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
          <Route exact path='/' render={(props) => (<Dashboard articles={this.state.articles}/>)}/>
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
        <img id="dashboard-image" src={require('./assets/018.jpg')} alt="background-image"></img>
        <div id="dashboard-text">Your very own <span className="underline-word">art gallery</span>.</div>
        <div className="container">
          <ListFilters></ListFilters>
          <DashboardList articles={this.props.articles}></DashboardList>
        </div>
      </div>
    )
  }
}

class ListFilters extends React.Component {
  render() {
    return (
      <div className="list-filters-container" >
        <h1>Browse By Category</h1>
        <span className="category-item" >Paintings</span>
        <span className="category-item">Drawings</span>
        <span className="category-item">Something</span>
        <span className="category-item">Miscelaneous</span>
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
    var newUser = { 
      "FirstName": this.state.first_name,
      "LastName":this.state.last_name,
      "Email":this.state.email,
      "Password":this.state.password
    }
    this.props.updateUsers(newUser);
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
            <div className="fix-space"></div>
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
    var newUser = { 
      "first_name": self.state.first_name,
      "last_name":self.state.last_name,
      "email":self.state.email,
      "password":self.state.password
    }
    
    self.props.updateUsers(newUser);
    window.location.href = "/";
  }

}



const style = {
  margin: 15,
};

export default withRouter(App);