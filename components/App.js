import React from 'react';
import TweetWall from './TweetWall';

import { getTweets }from '../lib/mockAPI';
import { initialize, update } from '../lib/chart';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      latestTweets: []
    };
    initialize();
    this.updateChart = this.updateChart.bind(this);
    this.fetchTweets = this.fetchTweets.bind(this);
  }

  // TODO: componentWillMount()
  componentWillMount(){
    //update state before render
    this.fetchTweets();
  }

  // TODO: componentDidMount()
  componentDidMount(){
    this.startInterval();
  }

  // TODO: componentWillUnmount()
  componentWillUnmount(){
    //clear the timer interval
    this.cleanUpInterval();
  }

  // TODO: componentDidUpdate()
  componentDidUpdate(){
    this.updateChart(this.state.latestTweets.length)
  }

  updateChart(numTweets) {
    update(numTweets);
  }

  startInterval() {
    this.interval = setInterval(this.fetchTweets, 2000);
  }

  cleanUpInterval() {
    clearInterval(this.interval);
  }

  fetchTweets() {
    const newTweets = getTweets();
    this.setState({
      latestTweets: newTweets
    });
  }

  render() {
    return (
      <div><TweetWall newTweets={this.state.latestTweets} /></div>
    )
  }
}
