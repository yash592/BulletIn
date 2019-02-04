import React, { Component } from "react";
import {Button, Icon, Card, CardTitle } from 'react-materialize'
import Nav from "../../components/Nav";
import NewsCard from "../../components/NewsCard";
import Loading from "../../components/Loading";
import API from "../../utils/API"
import ButtonUI from '@material-ui/core/Button';


// Home component where all the top headlines are rendered

class Home extends Component {

  goTo(route) {
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

  navClick() {
    console.log('nav clicked');
    this.login.bind(this)
  }

  render() {
    console.log(this.props);
    return (
      (this.state.loading) ? <Loading /> :
      <React.Fragment>
        <div style={{height: '20%'}}>
          <Nav />
          <ButtonUI color="black" onClick={this.login.bind(this, 'saved')}>Login</ButtonUI>
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
