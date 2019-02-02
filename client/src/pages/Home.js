import React, { Component } from "react";
import {Button, Icon, Card, CardTitle } from 'react-materialize'
import Nav from "../components/Nav";
import NewsCard from "../components/NewsCard";
import Loading from "../components/Loading";
import API from "../utils/API"

// Home component where all the top headlines are rendered

class Home extends Component {

  constructor(props) {
        super(props);
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
      })
  }

  handleLikeClick = key => {
    console.log('save clicked', key );
    const story = this.state.news.find((stories) => stories.url === key)
    console.log(story);
    API.saveNews(story);
  }

  render() {
    // console.log(_id);
    return (
      (this.state.loading) ? <Loading /> :
      <React.Fragment>
        <div style={{height: '20%'}}>
          <Nav />
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
