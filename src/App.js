import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, RaisedButton, TextField} from 'material-ui';
import axios from 'axios';
import {NavLink, Switch, Route, withRouter} from 'react-router-dom';


class App extends Component {
  render(){
    return (
      <div>
        <Header></Header>
        
        <div className="fix-space"></div>
        
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/signup' component={Register}/>
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
          <li >Option 1</li>
          <li >Option 2</li>
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
        This is Dashboard

      <ListFilters></ListFilters>
      <DashboardList></DashboardList>

      </div>
    )
  }
}

class ListFilters extends React.Component {
  render() {
    return (
      <div>This is list filters</div>
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
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }

  handleClick(event){
    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
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