import React, { Component } from "react";
import {Button, Icon, Card, CardTitle } from 'react-materialize'
import Nav from "../components/Nav";
import NewsCard from "../components/NewsCard";


import API from "../utils/API"

class Home extends Component {

  state = {
    news: [],
    loading: true,

  }
  componentDidMount() {
    API.getArticles()
      .then(res => {
        // console.log("RESULTSSSSSSSSSSS", res);
        this.setState({
          news: res.data,
        })
      })
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
      <div style={{height: '20%'}}>
        <Nav />
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
      {this.state.news.map(news => (
        <NewsCard
          description={news.description}
          image={news.urlToImage}
          source={news.source.name}
          title={news.title}
          />
      ))}
      </div>

      </React.Fragment>

    )
  }
}

export default Home;
