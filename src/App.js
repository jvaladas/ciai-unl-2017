import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, RaisedButton, TextField} from 'material-ui';
import axios from 'axios';
import {BrowserRouter,NavLink, Switch, Route,Redirect, withRouter} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import TransitionGroup from 'react-transition-group/TransitionGroup';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
        currentUser: null,
        articles: [
          {
            "id":1,
            "Name":"Higher Motion",
            "Description":"Painting, 35.4 H x 23.6 W x 0.8 in",
            "ImageUrl":"https://i.pinimg.com/originals/26/2d/a4/262da433a20602c80382fea94a8c1c26.jpg",
            "Category":"Painting",
            "Autor":"andre@aol.com.br"
          },
          {
            "id":2,
            "Name":"Portrait",
            "Description":"Painting, 23.6 H x 19.7 W x 0.8 in",
            "ImageUrl":"http://www.goddessofegypt.com/wp-content/uploads/2017/06/Abstract-Painting.jpg",
            "Category":"Painting",
            "Autor":"andre@aol.com.br"
          },
          {
            "id":3,
            "Name":"Impeccability of white",
            "Description":"Painting, 31.5 H x 31.5 W x 0.8 in",
            "ImageUrl": "https://twistedsifter.files.wordpress.com/2014/06/fine-art-finger-paintings-by-iris-scott-3.jpg?w=800&h=800",
            "Category":"Painting",
            "Autor":"j@aol.com"
          },
          {
            "id":4,
            "Name":"Afterglow",
            "Description":"Painting, 30 H x 24 W x 0.7 in",
            "ImageUrl": "https://images.fineartamerica.com/images-medium-large-5/blue-venice-dmitry-spiros.jpg",
            "Category":"Painting",
            "Autor":"j@aol.com"
          },
          {
            "id":5,
            "Name":"Three Blue Vases",
            "Description":"Painting, 24 H x 30 W x 1.5 in",
            "ImageUrl": "https://images-na.ssl-images-amazon.com/images/I/91MzV6V79DL._SL1500_.jpg",
            "Category":"Painting",
            "Autor":"j@aol.com"
          },
          {
            "id":6,
            "Name":"The One With Sprinkes",
            "Description":"Painting, 31.5 H x 31.5 W x 0.8 in",
            "ImageUrl": "http://poststudioarts.com/wp-content/uploads/2016/05/art-painting-vangoghrhonecom14.jpg",
            "Category":"Painting",
            "Autor":"j@aol.com"
          },
          {
            "id":7,
            "Name":"Boating blues 2",
            "Description":"Painting, 24 H x 30 W x 1.5 in",
            "ImageUrl": "https://afremov.com/image.php?type=P&id=19255",
            "Category":"Painting",
            "Autor":"andre@aol.com.br"
          },
          {
            "id":8,
            "Name":"Woodland Creature III",
            "Description":"Painting, 30 H x 24 W x 0.7 in",
            "ImageUrl": "https://affordableartfair.com/media/cache/1/marketplace/17f82f742ffe127f42dca9de82fb58b1/fair/2/58d3eac4e5b4c.jpg",
            "Category":"Painting",
            "Autor":"andre@aol.com.br"
          }
        ],
        users: [
          {
            "id":1,
            "FirstName":"Andre",
            "LastName":"Maria",
            "Email": "andre@aol.com.br",
            "Password": "123"
          },
          {
            "id":2,
            "FirstName":"Joao",
            "LastName":"Carlos",
            "Email": "j@aol.com",
            "Password": "qwerty"
          }
        ]
    }
  }
  
  render(){
    return (
      <div>
        <Header logoutUser = {() => this.setState({currentUser : null})}
          currentUser={this.state.currentUser}></Header>
        <div className="fix-space"></div>

        <Switch>
          <Route exact path='/' render={(props) => (<Dashboard articles={this.state.articles}/>)}/>
          <Route path='/signup' render={(props) => (<Register users={this.state.users}
            updateUsers={(newUser) => this.setState({ users: this.state.users.concat(newUser) })}
            loginUser={(user) => this.setState({currentUser: user})}/> )}/>
          <Route path='/account' render={(props) => ( <Account currentUser={this.state.currentUser}
            updateArt={(newArticle) => this.setState({ articles: this.state.articles.concat(newArticle) })}
            collection={this.state.articles.filter(x => x.Autor === this.state.currentUser.Email)} />)}/>
          <Route path='/article/:id' render={(props) => (<ArticleDetails {...props} articles={this.state.articles} />)}/>
          <Route path='/messages' render={(props) => <MessagesList />}/>
        </Switch>

        <Footer></Footer>
      </div>
    );
  }

}

class Header extends Component {
  render() {
    var el = null;

    if(this.props.currentUser === null){
      el = (  
        <div className="navigation-bar">
          <span id="store-name">
            <NavLink to="/" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              Store Name
            </NavLink>
          </span>
          <ul className="navigation-list" >
            <li>
              <NavLink to="/signup" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      );
    }
    else {
      el = (
        <div className="navigation-bar">
        <span id="store-name">
          <NavLink to="/" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
            Store Name
          </NavLink>
        </span>
        <ul className="navigation-list" >
          <li>
            <NavLink to="/messages" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              {this.props.currentUser.FirstName}
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={this.handleLogout} activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              Sign out
            </NavLink>
          </li>
        </ul>
      </div>
      );
    }

    return el;
  }

  handleLogout(){
    this.props.logoutUser();
  }

}


class Footer extends React.Component {
  render(){
    return (
      <div className="footer-wrapper">
        <div className="container">
          <p>This project is part of the course on Web Applications Development at FCT UNL - Fall 2017.</p>
        </div>
      </div>
    )
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <div>
		<div id="myCarousel" className="carousel slide" data-ride="carousel">
			<ol className="carousel-indicators">
				<li data-target="#myCarousel" data-slide-to="0" className="active"></li>
				<li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
			</ol>
			<div className="carousel-inner">
				<div className="item active">
					<img src={require('./assets/018.jpg')} alt="dashboard-image-1" style={imgstyle}/>
				</div>
				<div className="item">
					<img src={require('./assets/017.jpg')} alt="dashboard-image-2" style={imgstyle}/>
				</div>
        <div className="item">
          <img src={require('./assets/20.jpg')} alt="dashboard-image-3" style={imgstyle}/>
        </div>
			</div>

			<a className="left carousel-control" href="#myCarousel" data-slide="prev">
				<span className="glyphicon glyphicon-chevron-left"></span>
				<span className="sr-only">Previous</span>
			</a>
			<a className="right carousel-control" href="#myCarousel" data-slide="next">
				<span className="glyphicon glyphicon-chevron-right"></span>
				<span className="sr-only">Next</span>
			</a>
			
		</div>
        <div id="dashboard-text">
          <div className="text-item" >Your very own art gallery, </div>
          <div id="bottom-text" className="text-item" >wherever you are.</div>
        </div>
        <div className="container">
          <ListFilters filterName="all"></ListFilters>
          <ListFilters filterName="category"></ListFilters>
          <DashboardList articles={this.props.articles}></DashboardList>
          <ListFilters filterName="price"></ListFilters>
          <div className="fix-space"></div>
          <div className="fix-space"></div>
          <div className="fix-space"></div>
          <div className="fix-space"></div>
          <div className="fix-space"></div>
        </div>
      </div>
    )
  }
}

class ListFilters extends React.Component {
  
  render() {
    var elem = null;
    if(this.props.filterName === "price"){
      elem = (
        <div className="list-filters-container" >
          <h1>Browse Art by Price</h1>
          <span className="category-item">100€ </span>
          <span className="category-item">500€</span>
          <span className="category-item">1500€</span>
          <span className="category-item">2500€</span>
        </div>
      );
    }
    else if(this.props.filterName === "category"){
      elem = (
        <div className="list-filters-container" >
          <h1>Browse Art by Category</h1>
          <span className="category-item">Paintings</span>
          <span className="category-item">Drawings</span>
          <span className="category-item">Photography</span>
          <span className="category-item">Miscelaneous</span>
        </div>
      );
    }
    else {
      elem = (
        <div className="list-filters-container" >
        <h1>Recent Artwork</h1>
      </div>
      )
    }

    return elem;
  }
}

class DashboardList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentId:-1
    }
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <ul id="article-list">
        {this.props.articles.map( (article,index) => 
          <li key={index} onClick={() => this.handleClick(article.id)}>
            <DashboardListItem name={article.Name} description={article.Description} imgUrl={article.ImageUrl}></DashboardListItem>
            {this.state.currentId === article.id && (
              <Redirect to={'/article/'+article.id}/>
            )}
          </li>)
        }
      </ul>
    )
  }

  handleClick(index){
    this.setState({currentId:index});
  }
}

const paperStyle = {
  height: 260,
  width: 260,
  margin: 6,
  display: 'inline-block',
}
class DashboardListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {shadow:1}
  }

  onMouseOver = () => this.setState({ shadow: 2 });
  onMouseOut = () => this.setState({ shadow: 1 });

  render() {
    return (
        <MuiThemeProvider>
            <Paper onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}
              id="paper-container" style={paperStyle} zDepth={this.state.shadow}>
              <img className="article-image" src={this.props.imgUrl} alt="article-image"></img>
              <div id="article-name">{this.props.name}</div>
              <div id="article-description">{this.props.description}</div>
            </Paper>
        </MuiThemeProvider>
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
      password:'',
      login_email:'',
      login_password:'',
      fireRedirect:false
    }
  }
  
  render() {
    
    return (
      <div className="register-wrapper">
        
        <div className="container">
          <div className="breadcrumbs">
            <span>Home </span>/
            <span> Register</span>
          </div>
        <MuiThemeProvider>
          <div className="register-form" >
            <h4>Register</h4>
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
           <RaisedButton label="Register" primary={true} style={style} onClick={(event) => this.handleRegister(event)}/>
          </div>
          <div className="login-form">
            <h4>Login</h4>
            <TextField
              hintText="Enter your email"
              floatingLabelText="Email"
              onChange = {(event,newValue) => this.setState({login_email:newValue})}
            />
            <br/>
            <TextField
              hintText="Enter your account password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({login_password:newValue})}
            />
            <br/>
            <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleLogin(event)}/>
          </div>
          {this.state.fireRedirect && (
            <Redirect to={'/'}/>
          )}
         </MuiThemeProvider>
         </div>
         <div className="fix-space"></div>
      </div>
    );
  }

  handleRegister(event){
    var self = this;
    var newUser = { 
      "FirstName": this.state.first_name,
      "LastName":this.state.last_name,
      "Email":this.state.email,
      "Password":this.state.password
    }
    this.props.updateUsers(newUser);
    this.props.loginUser(newUser);
    this.state.setState({fireRedirect : true});
  }

  handleLogin(event){
    var self = this;
    var parameters = {
      "Email":this.state.login_email,
      "Password":this.state.login_password
    }
    this.props.loginUser(this.props.users.find(e => e.Email == parameters.Email && e.Password == parameters.Password));
    this.setState({fireRedirect : true});
  }
}

class Account extends React.Component{
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      artName:'',
      artDescription:'',
      imageUrl: '',
      category:'',
      autor:this.props.currentUser.Email,
      artCollection:this.props.collection,
      currentId:-1
    }
  }

    render() {  
      let {imageUrl} = this.state;
      let $imagePreview = null;
      if (imageUrl) {
        $imagePreview = (<img src={imageUrl} />);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
      console.log(this.state);

      return (
        <div className="account-wrapper">
        <MuiThemeProvider>
        <div className="container">
          <div className="breadcrumbs">
              <span>Home </span>/
              <span> My Account</span>
          </div>
          <div className="article-title">My Account</div>

          <div className="content-wrapper">
            <h1>Basic Information</h1>
              <div><span className="details-item">First Name:</span> {this.props.currentUser.FirstName}</div>
              <div><span className="details-item">Last Name:</span> {this.props.currentUser.LastName}</div>
              <div><span className="details-item">Email:</span> {this.props.currentUser.Email}</div>
          </div>
          <div className="content-wrapper">
            <h1>My Collection</h1>
            <ul id="article-list">
              {this.state.artCollection.map( (article,index) => 
                <li key={index} onClick={() => this.handleNavigation(article.id)}>
                  <DashboardListItem name={article.Name} description={article.Description} imgUrl={article.ImageUrl}></DashboardListItem>
                  {this.state.currentId === article.id && (
                    <Redirect to={'/article/'+article.id}/>
                  )}
                </li>)
              }
            </ul>
          </div>

          <h4>Add a new item</h4>
          <div>
            <TextField
              hintText="Enter article's name"
              floatingLabelText="Article name"
              onChange = {(event,newValue) => this.setState({artName:newValue})}
            />
          <br/>
          <TextField
            hintText="Enter the article's description"
            floatingLabelText="Description"
            onChange = {(event,newValue) => this.setState({artDescription:newValue})}
          />
          <br/>
          <TextField
              hintText="Enter Category"
              type="category"
              floatingLabelText="Category"
              onChange = {(event,newValue) => this.setState({category:newValue})}
              />
            <br/>
            
            <br/>
              </div>
              <div>
                <div className="previewComponent">
                <form onSubmit={(event)=>this._handleSubmit(event)}>
                <input className="fileInput" 
                  type="file" 
                  onChange={(event)=>this._handleImageChange(event)} />
                  <RaisedButton type="submit" label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </form>
          {/*<div className="imgPreview">
            {$imagePreview}
          </div>*/}
        </div>
                </div>
              
          </div>
          </MuiThemeProvider>
          </div>
      );
  }

  handleClick(event){
    console.log("State",this.state);
    //To be done:check for empty values before hitting submit
    event.preventDefault();
    console.log('handle uploading-', this.state.file);

    var newArticle = { 
      "Name":this.state.artName,
      "Description":this.state.artDescription,
      "ImageUrl": this.state.imageUrl,
      "Category": this.state.category,
      "Autor":this.state.autor
    }

    
    if(newArticle.ImageUrl!=""){
      this.props.updateArt(newArticle);
     
    }
   console.log('newArticle',newArticle);
   
  }

  _handleImageChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  handleNavigation(index){
    this.setState({currentId:index});
  }
}

class MessagesList extends React.Component {
  
  render() {
    return (
      <div className="messages-wrapper">
          <div className="container">
            <div className="breadcrumbs">
              <span>Home </span>/ 
              <span> Notifications</span>
            </div>
            <div className="article-title">Notifications</div>
            <div className="content-wrapper">
              <p>Messages list</p>
            </div>
          </div>
        </div>
    )
  }
}


class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}

class ArticleDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comment:'',
      rating:'',
      article:''
    }
  }

  componentWillMount() {
    var articleId = this.props.match.params.id;
    this.setState({article: this.props.articles.find(x => x.id === Number(articleId))});
  }

  render() {
    return (
      <div id="article-wrapper">
        <div className="container">
          <div className="breadcrumbs">
            <span>Home </span>/ 
            <span> Category </span>/ 
            <span> Item </span>
          </div>
          <div className="article-title">{this.state.article.Name} <span>by {this.state.article.Autor}.</span></div>
          <div className="content-wrapper">
            <img id="article-image" src={this.state.article.ImageUrl} />
          </div>
          <div className="content-wrapper">
            <h1>Description</h1>
            <p>{this.state.article.Category}</p>
            <p>{this.state.article.Description}</p>
          </div>
          <div className="content-wrapper">
            <h1>Comments and Reviews</h1>
            <p>Comment List</p>
          </div> 
        </div>
      </div>
    )
  }
}

const style = {
  margin: 15,
};

const imgstyle = {
	height: 390,
    display: 'block',
    margin: 'auto',
    width:'100%'

};

export default withRouter(App);