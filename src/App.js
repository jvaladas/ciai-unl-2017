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
        currentUser: {
          "FirstName":"Andre",
          "LastName":"Maria",
          "Email": "andre@aol.com.br",
          "Password": "123"
        },
        articles: [
          {
            "Name":"Higher Motion",
            "Description":"Painting, 35.4 H x 23.6 W x 0.8 in",
            "ImageUrl":"https://i.pinimg.com/originals/26/2d/a4/262da433a20602c80382fea94a8c1c26.jpg",
            "Category":"Painting",
            "Autor":"andre@aol.com.br"
          },
          {
            "Name":"Portrait",
            "Description":"Painting, 23.6 H x 19.7 W x 0.8 in",
            "ImageUrl":"http://www.goddessofegypt.com/wp-content/uploads/2017/06/Abstract-Painting.jpg",
            "Category":"Painting",
            "Autor":"andre@aol.com.br"
          },
          {
            "Name":"Impeccability of white",
            "Description":"Painting, 31.5 H x 31.5 W x 0.8 in",
            "ImageUrl": "https://twistedsifter.files.wordpress.com/2014/06/fine-art-finger-paintings-by-iris-scott-3.jpg?w=800&h=800",
            "Category":"Painting",
            "Autor":"j@aol.com"
          },
          {
            "Name":"Afterglow",
            "Description":"Painting, 30 H x 24 W x 0.7 in",
            "ImageUrl": "https://images.fineartamerica.com/images-medium-large-5/blue-venice-dmitry-spiros.jpg",
            "Category":"Painting",
            "Autor":"j@aol.com"
          },
          {
            "Name":"Three Blue Vases",
            "Description":"Painting, 24 H x 30 W x 1.5 in",
            "ImageUrl": "https://images-na.ssl-images-amazon.com/images/I/91MzV6V79DL._SL1500_.jpg",
            "Category":"Painting",
            "Autor":"j@aol.com"
          },
          {
            "Name":"The One With Sprinkes",
            "Description":"Painting, 31.5 H x 31.5 W x 0.8 in",
            "ImageUrl": "http://poststudioarts.com/wp-content/uploads/2016/05/art-painting-vangoghrhonecom14.jpg",
            "Category":"Painting",
            "Autor":"j@aol.com"
          },
          {
            "Name":"Boating blues 2",
            "Description":"Painting, 24 H x 30 W x 1.5 in",
            "ImageUrl": "https://afremov.com/image.php?type=P&id=19255",
            "Category":"Painting",
            "Autor":"andre@aol.com.br"
          },
          {
            "Name":"Woodland Creature III",
            "Description":"Painting, 30 H x 24 W x 0.7 in",
            "ImageUrl": "https://affordableartfair.com/media/cache/1/marketplace/17f82f742ffe127f42dca9de82fb58b1/fair/2/58d3eac4e5b4c.jpg",
            "Category":"Painting",
            "Autor":"andre@aol.com.br"
          }
        ],
        users: [
          {
            "FirstName":"Andre",
            "LastName":"Maria",
            "Email": "andre@aol.com.br",
            "Password": "123"
          },
          {
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
        <Header userName={this.state.currentUser.FirstName}></Header>
        <div className="fix-space"></div>

        <Switch>
          <Route exact path='/' render={(props) => (<Dashboard articles={this.state.articles}/>)}/>
          <Route path='/signup' render={(props) => (<Register users={this.state.users}
            updateUsers={(newUser) => this.setState({ users: this.state.users.concat(newUser) })}/> )}/>
          <Route path='/account' render={(props) => ( <Account currentUser={this.state.currentUser}
            updateArt={(newArticle) => this.setState({ articles: this.state.articles.concat(newArticle) })} />)}/>
          <Route path='/article' render={(props) => (<ArticleDetails id="1" />)}/>
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
          <NavLink to="/" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
            Store Name
          </NavLink>
        </span>
        <ul className="navigation-list" >
          <li>
            <NavLink to="/article" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              Article Details
            </NavLink>
          </li>
          <li>Option 1</li>
          <li>
            <NavLink to="/account" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              {this.props.userName}
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
}


class Footer extends React.Component {
  render(){
    return (
      <div className="footer-wrapper">
        <div className="container">
          <p>Still got to think about something to write on this footer. Maybe later I'll know. It's 2017</p>
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
  render() {
    return (
      <ul id="article-list">
        {this.props.articles.map( (article,index) => 
          <li key={index}>
            <DashboardListItem name={article.Name} description={article.Description} imgUrl={article.ImageUrl}></DashboardListItem>
          </li>)
        }
      </ul>
    )
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
      password:''
    }
  }
  
  render() {
    return (
      <div className="container register-form">
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
           <RaisedButton label="Register" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }

  handleClick(event){
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
      autor:this.props.currentUser.Email}
    
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

        <MuiThemeProvider>
        <div className="container">
            <div>First Name: <span>{this.props.currentUser.FirstName}</span></div>
            <div>Last Name: <span>{this.props.currentUser.LastName}</span></div>
            <div>Email: <span>{this.props.currentUser.Email}</span></div>
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
            
        </div>
        </MuiThemeProvider>
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
      rating:''
    }
  }

  render() {
    return (
      <div id="article-wrapper">
        <div className="container">
          <div className="content-wrapper">
            <h1>Article Details #{this.props.id}</h1>
            <p>THasiodnafbuiasn ausduiasd hasd aasf asfohfashiod fhoasfhioas fasasfasff</p>
            <p>afuiasu uhasfuiasufhuais fasfauisf hasfasfauasuhfasuhfhasf hasf asasfasf asfasaf</p>
            <p>asfuiasuifasunauns uiasf uiasfas uiasfasfas uiasf as fuhasif uiasf asfui asasfui</p>
          </div>
          <div className="content-wrapper">
            <h1>Content Media</h1>
            <p>THasiodnafbuiasn ausduiasd hasd aasf asfohfashiod fhoasfhioas fasasfasff</p>
            <p>afuiasu uhasfuiasufhuais fasfauisf hasfasfauasuhfasuhfhasf hasf asasfasf asfasaf</p>
            <p>asfuiasuifasunauns uiasf uiasfas uiasfasfas uiasf as fuhasif uiasf asfui asasfui</p>
          </div>
          <div className="content-wrapper">
            <h1>Comments and Reviews</h1>
            <p>THasiodnafbuiasn ausduiasd hasd aasf asfohfashiod fhoasfhioas fasasfasff</p>
            <p>afuiasu uhasfuiasufhuais fasfauisf hasfasfauasuhfasuhfhasf hasf asasfasf asfasaf</p>
            <p>asfuiasuifasunauns uiasf uiasfas uiasfasfas uiasf as fuhasif uiasf asfui asasfui</p>
            
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