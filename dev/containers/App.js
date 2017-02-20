import React, { Component } from 'react';
// import BetterImg from '../../dist';
import BetterImg from '../../src';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>resizeMode: Contain</h1>
        <BetterImg
          src="/img/puppy.jpg"
          height={600}
          resizeMode="contain"
        />
        <h1>resizeMode: Cover</h1>
        <BetterImg
          src="/img/puppy.jpg"
          height={600}
          resizeMode="cover"
        />
        <h1>resizeMode: Stretch</h1>
        <BetterImg
          src="/img/puppy.jpg"
          height={600}
          resizeMode="stretch"
        />
      </div>
    );
  }
};
