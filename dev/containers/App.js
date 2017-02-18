import React, { Component } from 'react';
import BetterImg from '../../src/BetterImg';

export default class App extends Component {
  render() {
    return (
      <div>
        <BetterImg
          src="/img/puppy.jpg"
          height={600}
          resizeMode="contain"
        />
      </div>
    )
  }
};
