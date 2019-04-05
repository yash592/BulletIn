import React, { Component } from "react";
import { Icon, Card, CardTitle } from 'react-materialize'
import Nav from "../../components/Nav";
import NewsCard from "../../components/NewsCard";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import Input from "../../components/Input";
import API from "../../utils/API"
import ButtonUI from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import history from '../../history';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Home component where all the top headlines are rendered

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      news: [],
      summary:[],
      summaryUrl: '',
      userID: '',
      user: props.auth.id, //
      pageLoading: true,
      gistLoading: true,
      value: ''
    }
    localStorage.setItem('user', this.state.user)
    console.log(localStorage);

    // console.log(this.state);
  }

  goTo(route) {
  // console.log(history, route);
  this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }



  componentDidMount() {
    console.log(this.props);
    this.getArticles();
    const { renewSession } = this.props.auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }

  }


// API call to display trending news

  getArticles = () => {
    API.getArticles()
      .then(res => {
        this.setState({
          news: res.data,
          pageLoading: false,
          user: this.props.auth.id
        })
        console.log(this.state);
      });
  }

  // API call to display news by searchterm

  getArticlesBySearchTerm = event => {
    event.preventDefault();
    console.log(this.state.value);
    const searchTerm = this.state.value
    API.getArticlesBySearchTerm(searchTerm)
      .then(res => {
        console.log(res);
        this.setState({
          news: res.data.articles,
          pageLoading: false,
          user: this.props.auth.id
        })
        console.log(this.state.news);
      })
  }

  notify = () => {
    // console.log('gg');
     toast.warning("Bookmarked!", {
       position: toast.POSITION.TOP_RIGHT
     });
}

  handleLikeClick(key) {
    // console.log(this.props.isAuthenticated);
    let user = localStorage.getItem("user")
    console.log(user);
    if(localStorage.getItem("user")==="undefined") {
      this.login()
    } else {
      // console.log('save clicked', key );
      const story = this.state.news.find((stories) => stories.url === key)
      // console.log(story, this.state.user);
      API.saveUserNews(story, user).then(res => {console.log(res)});
      this.notify();
    }
  }

  handleDetailClick = link => {
    API.summarize(link)
      .then(res => {
        console.log(res.body.sentences);
        const gist = _.map(res.body.sentences)
        this.setState({
          summary: gist,
          summaryUrl: link,
        })
      })
  }

  handleChange = event => {
    const {name,value} = event.target
    this.setState({
    value: event.target.value
    })
    console.log(this.state);
  }

  onKeyPress = (e) => {
    if(e.key === 'Enter') {
      console.log('enter!');
      const searchTerm = this.state.value
      API.getArticlesBySearchTerm(searchTerm)
        .then(res => {
          console.log(res);
          this.setState({
            news: res.data.articles,
            pageLoading: false,
            user: this.props.auth.id
          })
          console.log(this.state.news);
        })
    }
  }




  render() {

    const { isAuthenticated } = this.props.auth;
    return (
      (this.state.pageLoading) ? <Loading /> :
      <div>
        <div style={{width: '100%', height: '10%'}}>
          <Nav
            value={this.state.value}
            handleChange={this.handleChange}
            handleSearch={this.getArticlesBySearchTerm}
            onKeyPress={this.onKeyPress}
          />
        </div>
        <div style={{height: '35%'}}>
          {
            !isAuthenticated() && (
              <ButtonUI color="primary" onClick={this.login.bind(this)}>Login</ButtonUI>
            )
          }
          {
            isAuthenticated() && (
              <div style={{marginTop: '2%'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <img src={this.props.auth.userImage} style={{width: 150, height: 150, borderRadius: 100,  boxShadow: `2px 0px 4px grey`}}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <p style={{fontFamily: "Roboto", fontWeight: 400, fontSize: 30, color: 'black'}}>Welcome back {this.props.auth.name}! </p>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonUI color="secondary" onClick={this.logout.bind(this)}>Logout</ButtonUI>

                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonUI color='inherit' onClick={this.goTo.bind(this, 'saved')}>Saved</ButtonUI>
                </div>
              </div>
            )
          }
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', padding: 20, alignItems: 'center', justifyContent: 'center' }}>

          {this.state.news.map(news => (

            <NewsCard
              key={news.url}
              _id={news.url}
              description={news.description}
              image={news.urlToImage ? news.urlToImage : 'https://i.imgur.com/SB0VyTQ.png'}
              source={news.source.name}
              title={news.title}
              summary={news.url === this.state.summaryUrl ? this.state.summary: ''}
              onExpand={this.handleDetailClick.bind(this, news.url)}
              onSave={this.handleLikeClick.bind(this, news.url)}
              gistLoading={this.state.gistLoading}
            />
        ))}
        <ToastContainer autoClose={2000} />
        </div>
      </div>
    )
  }
}

export default Home;
