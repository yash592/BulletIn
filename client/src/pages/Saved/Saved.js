import React, { Component } from 'react';
import API from "../../utils/API"
import {Button, Icon, Card, CardTitle } from 'react-materialize'
import Nav from "../../components/Nav";
import NewsCard from "../../components/NewsCard";
import Loading from "../../components/Loading";
import ButtonUI from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import history from '../../history';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Saved extends Component {

  constructor(props) {
    super(props)
    console.log(props.auth.id);
    this.state={
      news: [],
      summary: [],
      summaryUrl: '',
      pageLoading: true,
      user: props.auth.id
    }
  }


  componentDidMount() {

    this.loadArticles();
    // const { renewSession } = this.props.auth;
    // if (localStorage.getItem('isLoggedIn') === 'true') {
    //   renewSession();
    // }
  }

  loadArticles() {
    const user = localStorage.getItem('user');
    API.getSavedArticles(user)
      .then(res => {
        console.log(res.data);
        this.setState({
          news: res.data.savedNews,
          pageLoading: false
        })
        console.log(this.state);
      })
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  logout() {
    this.props.auth.logout();
  }


  delNotify = () => {
    console.log('deleted');
    toast.warning('Deleted!', {
      position: toast.POSITION_TOP_RIGHT
    });
  }

  handleDeleteClick = link => {

    console.log('delete clicked', link);
    const story = this.state.news.find(stories => stories.url === link)
    const user = localStorage.getItem('user');
    console.log(story, user);
    API.deleteUserNews(story, user)
    this.delNotify();
    this.loadArticles();

  }

  handleDetailClick = link => {
    console.log('Summarizing');
    API.summarize(link)
      .then((res) => {
        const gist = _.map(res.raw_body.sentences)
        this.setState({
          summary: gist,
          summaryUrl: link,
        })
      })
  }


  render() {
    console.log(this.props);
    const { isAuthenticated } = this.props.auth;
    return (
      (this.state.pageLoading) ? <Loading/> :
      <React.Fragment>
        <div style={{height: '35%'}}>
          <Nav/>
          {
            isAuthenticated() && (
              <div style={{marginTop: '2%'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <img src={this.props.auth.userImage} style={{width: 150, height: 150, borderRadius: 100}}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <p style={{fontFamily: "Roboto", fontWeight: 400, fontSize: 44, color: 'black'}}>{this.props.auth.name}'s saved Bulletins </p>


                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonUI color="secondary" onClick={this.logout.bind(this)}>Logout</ButtonUI>

                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonUI color='inherit' onClick={this.goTo.bind(this, '')}>Home</ButtonUI>


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
              onSave={this.handleDeleteClick.bind(this, news.url)}
              gistLoading={this.state.gistLoading}
            />
        ))}
        <ToastContainer autoClose={2000} />
        </div>
      </React.Fragment>
    )
  }
}

export default Saved;
