import React from "react";
import "./NewsCard.css";
import {Button, Icon, Card, CardTitle } from 'react-materialize'


const NewsCard = (props) => (
  <div className="card">
    <div className="img-container">
      <Card header={<CardTitle reveal image={props.image} waves='light'/>}
        title={props.title}
        reveal={<p>{props.reveal}</p>}>
        <p><a href="#">This is a link</a></p>
      </Card>
    </div>
  </div>
);

export default NewsCard;
