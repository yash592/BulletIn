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
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Home component where all the top headlines are rendered

class Home extends Component {

  constructor(props) {
    super()
    this.state = {
      news: [],
      summary:[],
      summaryUrl: '',
      pageLoading: true,
      gistLoading: true
    }
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

  // API call to display trending news

  componentDidMount() {
    API.getArticles()
      .then(res => {
        this.setState({
          news: res.data,
          pageLoading: false
        })
        console.log(this.props.auth);
      });

    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  notify = () => {
    console.log('gg');
     toast.warning("Bookmarked!", {
       position: toast.POSITION.TOP_RIGHT
     });
}



  handleLikeClick = key => {
    console.log('save clicked', key );
    const story = this.state.news.find((stories) => stories.url === key)
    console.log(story);
    API.getSavedUsers()
      .then((res) => {
        console.log(res.data._id);
      })
    // API.saveNews(story);
    this.notify();

  }

  handleDetailClick = link => {
    // console.log('hadle detail', link);
    API.summarize(link)
      .then((res) => {
        // console.log(res.raw_body.sentences);
        const gist = _.map(res.raw_body.sentences)
        // console.log(gist);
        this.setState({
          summary: gist,
          summaryUrl: link,
          // gistLoading: false
        })
        // console.log(this.state.summaryUrl, link);
      })
  }


  render() {
    // console.log('props', this.state.news)
    const { isAuthenticated } = this.props.auth;

    return (
      (this.state.pageLoading) ? <Loading /> :
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
              summary={news.url === this.state.summaryUrl ? this.state.summary: ''}
              onExpand={this.handleDetailClick.bind(this, news.url)}
              onSave={this.handleLikeClick.bind(this, news.url)}
              gistLoading={this.state.gistLoading}
            />
        ))}
        <ToastContainer autoClose={2000} />
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
