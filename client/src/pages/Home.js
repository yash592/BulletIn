import React, { Component } from "react";
import {Button, Icon, Card, CardTitle } from 'react-materialize'
import Container from "../components/Container";

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

      <Container style={{width: '40%'}}>
          {this.state.news.map(news => (
            <Card header={<CardTitle reveal image={news.urlToImage} waves='light' style={{fontSize:10}} />}
              title={news.description} style={{fontSize:10}}
              reveal={<p>{news.description}</p>}style={{fontSize:10}}>
              <p><a href="#">This is a link</a></p>
            </Card>
          ))}
      </Container>

    )
  }
}

export default Home;
