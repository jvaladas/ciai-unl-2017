import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton, TextField} from 'material-ui';
import axios from 'axios';
import {NavLink, Switch, Route,Redirect, withRouter} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//import FlatButton from 'material-ui/FlatButton';
import './App.css';
//import TransitionGroup from 'react-transition-group/TransitionGroup';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
        currentUser: null,
        articles: [
        ],
        users: [
        ],
        reviews: [
        ],
        offers: [
          // id, articleid, authorId, requesterId, value, date
        ]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/users')
      .then(res => {
        const users = res.data.map(obj => obj);
        this.setState({users: users})
      })

      
    axios.get('http://localhost:8080/articles')
      .then(res => {
        const arts = res.data.map(obj => obj);
        this.setState({articles:arts})
      })

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
            collection={this.state.articles.filter(x => x.authorId === this.state.currentUser.id)} 
            articlesLength={this.state.articles.length} 
          />)}/>
          <Route path='/article/:id' render={(props) => (<ArticleDetails {...props} users={this.state.users} currentUser={this.state.currentUser} 
            addReview={(newReview) => this.setState({reviews: this.state.reviews.concat(newReview)})}
          />)}/>
          <Route path='/messages' render={(props) => <MessagesList users={this.state.users} articles={this.state.articles} 
          currentUser={this.state.currentUser} />}/>
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
              ArtistLife
            </NavLink>
          </span>
          <ul className="navigation-list" >
            <li>
              <NavLink to="/signup" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
                Sign up / Register
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
            Artist Life
          </NavLink>
        </span>
        <ul className="navigation-list" >
          <li>
            <NavLink to="/messages" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-artwork" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              Owned Artwork
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" activeClassName="active-link" style={{color:'white', textDecoration:'none'}}>
              {this.props.currentUser.firstName}
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
					<img src={require('./assets/018.jpg')} style={imgstyle}/>
				</div>
				<div className="item">
					<img src={require('./assets/017.jpg')} style={imgstyle}/>
				</div>
        <div className="item">
          <img src={require('./assets/20.jpg')} style={imgstyle}/>
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
          <ListFilters filterName="category"></ListFilters>
          <DashboardList articles={this.props.articles}></DashboardList>
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
    if(this.props.filterName === "category"){
      elem = (
        <div className="list-filters-container" >
          <h1>Browse Art by Category</h1>
          <span className="category-item">All</span> 
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
            <DashboardListItem name={article.name} description={article.description} imgUrl={article.imageUrl}></DashboardListItem>
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
              <img className="article-image" src={this.props.imgUrl}  alt="article-image"></img>
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
    var newUser = { 
      "firstName": this.state.first_name,
      "lastName":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password,
      "isArtist":true
    }

    axios.post('http://localhost:8080/users', newUser)
    .then(res => {
      this.props.updateUsers(newUser);
      this.props.loginUser(newUser);
      this.setState({fireRedirect : true});
    })
  }

  handleLogin(event){
    var parameters = {
      "email":this.state.login_email,
      "password":this.state.login_password
    }
    this.props.loginUser(this.props.users.find(e => e.email === parameters.email && e.password === parameters.password));
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
      currentId:-1,
      externalUrl:''
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
              <div><span className="details-item">First Name:</span> {this.props.currentUser.firstName}</div>
              <div><span className="details-item">Last Name:</span> {this.props.currentUser.lastName}</div>
              <div><span className="details-item">Email:</span> {this.props.currentUser.email}</div>
          </div>
          <div className="content-wrapper">
            <h1>My Collection</h1>
            <ul id="article-list">
              {this.state.artCollection.map( (article,index) => 
                <li key={index} onClick={() => this.handleNavigation(article.id)}>
                  <DashboardListItem name={article.name} description={article.description} imgUrl={article.imageUrl}></DashboardListItem>
                  {this.state.currentId === article.id && (
                    <Redirect to={'/article/'+article.id}/>
                  )}
                </li>)
              }
            </ul>
          </div>
          <div className="content-wrapper">
            <h1>Add a new item</h1>
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
          <TextField
            hintText="Enter External URL (optional)"
            type="text"
            floatingLabelText="External URL"
            onChange = {(event,newValue) => this.setState({externalUrl:newValue})}
          /> 
          </div>
          <br/>
            <div>
              <div className="previewComponent">
                <form onSubmit={(event)=>this._handleSubmit(event)}>
                  <input className="fileInput" 
                    type="file" 
                    onChange={(event)=>this._handleImageChange(event)} />
                  <RaisedButton type="submit" label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </form>
              </div>
            </div> 
          </div> 
          </div>
        </MuiThemeProvider>
      </div>
      );
  }

  handleClick(event){
    //To be done:check for empty values before hitting submit
    event.preventDefault();

    var newArticle = { 
      "id":this.props.articlesLength+1,
      "name":this.state.artName,
      "description":this.state.artDescription,
      "category": this.state.category,
      "authorId":this.state.autor
    }

    if(this.state.externalUrl !== '')
      newArticle.ImageUrl = this.state.externalUrl;
    else 
      newArticle.ImageUrl = this.state.imageUrl;

      this.props.updateArt(newArticle);
      this.setState({artCollection:this.state.artCollection.concat(newArticle)});
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
  
  constructor(props){
    super(props);
    this.state = {
      messages:[]
    }
  }

  componentWillMount() {
    axios.get('http://localhost:8080/offers?authorId='+this.props.currentUser.id).then((res) => {
      const mesgs = res.data.map(obj => obj);
      this.setState({messages:mesgs});
    })
  }

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
              <h1>Current Offers</h1>
              <OffersList removeOffer={(oldOffer) => this.setState({ messages: this.state.messages.filter(x => x.id !== oldOffer.id) })}
              articles={this.props.articles} users={this.props.users} offers={this.state.messages}></OffersList>
            </div>
          </div>
        </div>
    )
  }
}

class OffersList extends React.Component {

  getUserById(id) {
    if(id === 0 || id === undefined)
      return "Unknown";

    let user = this.props.users.filter(x => x.id === id)[0];
      return user.firstName + " " + user.lastName;
  }

  getOfferDate(date) {
    return date;
  }

  getArticleById(id){
    return this.props.articles.filter(x => x.id === id )[0];
  }

  handleAcceptClick(offer){
    let article = this.props.articles.filter(x => x.id === offer.articleId)[0];
    article.ownerId = offer.requesterId;  // set requester as owner

    // update article
    axios.put('http://localhost:8080/articles/'+article.id, article).then((res) => {

      axios.delete('http://localhost:8080/offers/'+offer.id).then((res2) => {
        this.props.removeOffer(offer);
        // remove from frontend
      })

    })

  }

  handleCancelClick(offer) {
    axios.delete('http://localhost:8080/offers/'+offer.id).then((res) => {
      //remove from frontend
      this.props.removeOffer(offer);
    })
  }

  render() {
    var view;
    
    if(this.props.offers.length > 0) {
      view = (
        <ul className="notifications-list" >
           {this.props.offers.map( (offer,index) => 
              <li key={index}>
                <span >
                  <img width="80px" src={this.getArticleById(offer.articleId).imageUrl} />
                </span>
                <span className="details-wrapper">
                  <div id="title" >{this.getArticleById(offer.articleId).name}</div>
                  <div id="user" >By {this.getUserById(offer.requesterId)}, {this.getOfferDate(offer.date)}</div>
                  <p id="content" >{offer.value} €</p>
                </span>
                <span className="actions-wrapper">
                <MuiThemeProvider>
                    <RaisedButton type="submit" label="Accept Offer" primary={true} style={style} onClick={() => this.handleAcceptClick(offer)}/>
                    <RaisedButton type="submit" label="Decline" primary={true} style={style} onClick={() => this.handleCancelClick(offer)}/>
                  </MuiThemeProvider>
                </span>
                <hr />
          </li>)}
        </ul>
      )
    }
    else {
      view = (
        <div>You currently do not have any notifications.</div>
      )
    }
    return view;
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
      reviews:[],
      article:'',
      reviewContent:'',
      offerValue:0,
      author:'',
      rating:0
    }
  }

  componentWillMount() {
    var articleId = this.props.match.params.id;

    axios.get('http://localhost:8080/articles/'+articleId).then((res) => {
      const art = res.data;
      this.setState({article:art});

      axios.get('http://localhost:8080/users/'+art.authorId).then((res) => {
        this.setState({author:res.data});
      })
    })

    axios.get('http://localhost:8080/reviews?articleId='+articleId)
    .then((res) => {
      const revs = res.data.map(obj => obj);
      this.setState({reviews:revs})
    })

  }

  handleOfferClick(event){
    event.preventDefault();
    console.log(event);

    var newOffer = {
      "articleId":this.state.article.id,
      "authorId":this.state.article.authorId,
      "requesterId":this.props.currentUser.id,
      "value":this.state.offerValue
    }

    axios.post('http://localhost:8080/offers', newOffer).then((res) => {

    }); 

  }

  handleClick(event){
    //To be done:check for empty values before hitting submit
    event.preventDefault();

    var newReview = { 
      "rating":this.state.rating,
      "description":this.state.reviewContent,
      "date": new Date().getTime(),
      "userId":this.props.currentUser.id,
      "articleId":this.state.article.id
    }
 
      axios.post('http://localhost:8080/reviews', newReview).then((res) => {
        this.props.addReview(newReview);
        this.setState({
          reviews:this.state.reviews.concat(newReview)
        });
      })
    }

  handleRatingChange = (event, index, value) => this.setState({rating: value});

  render() {
    return (
      <div id="article-wrapper">
        <div className="container">
          <div className="breadcrumbs">
            <span>Home </span>/ 
            <span> Category </span>/ 
            <span> Item </span>
          </div>
          <div className="article-title">{this.state.article.name} <span>by {this.state.author.firstName} {this.state.author.lastName}.</span></div>
          <img id="article-image" src={this.state.article.imageUrl} />  
          
          <div className="content-wrapper">
            <h1>Description</h1>
            <p>{this.state.article.category}</p>
            <p>{this.state.article.description}</p>
          </div>
          
          <div className="content-wrapper">
            <h1>Acquisition</h1>
            <p>In order to acquire this piece, you must first make an offer to the owner with your proposed value. </p>
            <form onSubmit={(event) => this.handleOfferSubmit(event)}>
              <MuiThemeProvider>
                <TextField
                  style={offerInputStyle}
                  hintText="Propose a value to acquire this piece."
                  floatingLabelText="Offer value"
                  onChange = {(event,newValue) => this.setState({offerValue:newValue})}
                />
                <RaisedButton type="submit" label="Submit" primary={true} style={style} onClick={(event) => this.handleOfferClick(event)}/>
              </MuiThemeProvider>
            </form>
          </div>

          <div className="content-wrapper">
            <h1>Comments and Reviews</h1>
            <ReviewsList users={this.props.users} reviews={this.state.reviews}></ReviewsList>
              <MuiThemeProvider>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                  <TextField
                    style={inputStyle}
                    hintText="Write a review on this piece."
                    floatingLabelText="Review"
                    onChange = {(event,newValue) => this.setState({reviewContent:newValue})}
                  />
                </div>
                  <div className="review-wrapper" >
                    <SelectField
                      floatingLabelText="Rating"
                      value={this.state.rating}
                      onChange={this.handleRatingChange}
                    >
                      <MenuItem value={1} primaryText="1 star" />
                      <MenuItem value={2} primaryText="2 stars" />
                      <MenuItem value={3} primaryText="3 stars" />
                      <MenuItem value={4} primaryText="4 stars" />
                      <MenuItem value={5} primaryText="5 stars" />
                    </SelectField>
                    <RaisedButton type="submit" label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                  </div>
                </form>
              </MuiThemeProvider>
          </div> 
        </div>
      </div>
    )
  }
}
const offerInputStyle = {
  width:"50%",
  display:"inline-block",
  padding:"0px 0px 0px 5%",
  margin:"0px 60px 0px 0px"
}
const inputStyle = {
  width:"90%",
  padding:"0px 0px 0px 5%"
}

class ReviewsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users:[]
    }
  }

  getUserById(id){
    if(id === 0)
      return "Unknown";

    let user = this.props.users.filter(x => x.id === id)[0];
    return user.firstName + " " + user.lastName;
  }

  getReviewDate(date){
    return date;
  }

  render() {
    var rend;

    if(this.props.reviews.length > 0) {
      rend = (
        <ul id="reviews-list">
          {this.props.reviews.map( (review,index) => 
            <li key={index}>
              <div id="user" >By {this.getUserById(review.userId)}, {this.getReviewDate(review.date)}</div>
              <p id="content" >"{review.description}"</p>
              <div id="rating" >{review.rating}/5 stars</div>
              <hr />
            </li>)
          }
        </ul>
      );
    }
    else {
      rend = (
        <div className="empty-review-list" >
          No one has commented or reviewed this article yet. You can be the first!
          <hr />
        </div>
      );
    }

    return rend;
  }

  handleClick(index){
    this.setState({currentId:index});
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