import React, { Component } from "react";

import API from "../utils/API"

class Home extends Component {
  componentDidMount() {
    API.getArticles()
      .then(res => {
        console.log("RESULTSSSSSSSSSSS", res);
      })
  }

  render() {
    return (
      <div>Hi</div>
    )
  }
}

export default Home;
