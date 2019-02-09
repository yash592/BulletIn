import React, { Component } from "react";
import {Button, Icon, Card, CardTitle } from 'react-materialize'
import Nav from "../../components/Nav";
import NewsCard from "../../components/NewsCard";
import Loading from "../../components/Loading";
import API from "../../utils/API"
import ButtonUI from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import history from '../../history';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';


// Home component where all the top headlines are rendered

class Home extends Component {

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

  state = {
    news: [],
    loading: true,
  }

  componentDidMount() {
    API.getArticles()
      .then(res => {
        this.setState({
          news: res.data,
          loading: false
        })
      });

      const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  handleLikeClick = key => {
    console.log('save clicked', key );
    const story = this.state.news.find((stories) => stories.url === key)
    console.log(story);
    API.saveNews(story);
  }


  render() {
    // console.log('props', this.props.history)
    const { isAuthenticated } = this.props.auth;


    return (
      (this.state.loading) ? <Loading /> :
      <React.Fragment>
        <div style={{height: '35%'}}>
          <Nav  />

          {
            !isAuthenticated() && (
              <ButtonUI color="primary" onClick={this.login.bind(this)}>Login</ButtonUI>
            )
          }
          {
            isAuthenticated() && (
              <div style={{marginTop: '2%'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <img src={this.props.auth.userImage} style={{width: 150, height: 150, borderRadius: 100}}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <p style={{fontFamily: "Roboto", fontWeight: 400, fontSize: 44, color: 'black'}}>Welcome back {this.props.auth.name}! </p>


                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonUI color="secondary" onClick={this.logout.bind(this)}>Logout</ButtonUI>

                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonUI color='inherit' onClick={this.goTo.bind(this, 'saved')}>Saved </ButtonUI>

                </div>
              </div>

              // <ButtonUI color='inherit' onClick={this.goTo.bind(this, 'saved')}> </ButtonUI>
            )
          }



        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
          {this.state.news.map(news => (
            <NewsCard
              key={news.url}
              _id={news.url}
              description={news.description}
              image={news.urlToImage}
              source={news.source.name}
              title={news.title}
              onClick={this.handleLikeClick.bind(this, news.url)}
            />
        ))}
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
