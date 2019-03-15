import React, { Component } from 'react';
import API from "../../utils/API"


class Saved extends Component {

  constructor(props) {
    super(props)
    console.log(props.auth.id);
  }


  componentDidMount() {
    // console.log(this.props);
    API.getSavedArticles()
      .then(res => {
        // console.log(res.data.savedNews);
        res.data.map((el) => {
          console.log(el.savedNews)
        })
      })
  }
  render() {
    console.log(this.props);
    return (
      <div>saved page!!</div>
    )
  }
}

export default Saved;
