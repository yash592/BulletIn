import React, { Component } from 'react';
import API from "../../utils/API"


class Saved extends Component {
  componentDidMount() {
    console.log(this.props);
    API.getSavedArticles()
      .then(res => {
        console.log(res);
      })
  }
  render() {
    return (
      <div>saved page!!</div>
    )
  }
}

export default Saved;
