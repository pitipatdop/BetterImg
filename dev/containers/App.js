

import React, { Component } from 'react';
// import BetterImg from '../../dist';
import BetterImg from '../../src';

export default class App extends Component {

  render() {
    return (
      <div className="container">
        <h1>resizeMode: Contain</h1>
        <BetterImg
          src="/img/puppy.jpg"
          height={600}
          resizeMode="contain"
        />
        <hr />
        <h1>resizeMode: Cover</h1>
        <pre>
          &lt;BetterImg scale={1} focalPoint="50% 50%"/&gt;
        </pre>
        <BetterImg
          src="/img/puppy.jpg"
          height={600}
          scale={1}
          focalPoint="75% 50%"
          resizeMode="cover"
        />
        <div className="row">
          <div className="col-sm-4">
            <pre>
              &lt;BetterImg scale={2} focalPoint="0% 0%"/&gt;
            </pre>
            <BetterImg
              src="/img/puppy.jpg"
              height={200}
              scale={2}
              focalPoint="0% 0%"
              resizeMode="cover"
            />
          </div>
          <div className="col-sm-4">
            <pre>
              &lt;BetterImg scale={2} focalPoint="50% 0%"/&gt;
            </pre>
            <BetterImg
              src="/img/puppy.jpg"
              height={200}
              scale={2}
              focalPoint="50% 0%"
              resizeMode="cover"
            />
          </div>
          <div className="col-sm-4">
            <pre>
              &lt;BetterImg scale={2} focalPoint="100% 0%"/&gt;
            </pre>
            <BetterImg
              src="/img/puppy.jpg"
              height={200}
              scale={2}
              focalPoint="100% 0%"
              resizeMode="cover"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <pre>
              &lt;BetterImg scale={2} focalPoint="0% 50%"/&gt;
            </pre>
            <BetterImg
              src="/img/puppy.jpg"
              height={200}
              scale={2}
              focalPoint="0% 50%"
              resizeMode="cover"
            />
          </div>
          <div className="col-sm-4">
            <pre>
              &lt;BetterImg scale={2} focalPoint="50% 50%"/&gt;
            </pre>
            <BetterImg
              src="/img/puppy.jpg"
              height={200}
              scale={2}
              focalPoint="50% 50%"
              resizeMode="cover"
            />
          </div>
          <div className="col-sm-4">
            <pre>
              &lt;BetterImg scale={2} focalPoint="100% 50%"/&gt;
            </pre>
            <BetterImg
              src="/img/puppy.jpg"
              height={200}
              scale={2}
              focalPoint="100% 50%"
              resizeMode="cover"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <pre>
              &lt;BetterImg scale={2} focalPoint="0% 100%"/&gt;
            </pre>
            <BetterImg
              src="/img/puppy.jpg"
              height={200}
              scale={2}
              focalPoint="0% 100%"
              resizeMode="cover"
            />
          </div>
          <div className="col-sm-4">
            <pre>
              &lt;BetterImg scale={2} focalPoint="0% 50%"/&gt;
            </pre>
            <BetterImg
              src="/img/puppy.jpg"
              height={200}
              scale={2}
              focalPoint="50% 100%"
              resizeMode="cover"
            />
          </div>
          <div className="col-sm-4">
            <pre>
              &lt;BetterImg scale={2} focalPoint="0% 100%"/&gt;
            </pre>
            <BetterImg
              src="/img/puppy.jpg"
              height={200}
              scale={2}
              focalPoint="100% 100%"
              resizeMode="cover"
            />
          </div>
        </div>
        <hr />
        <h1>resizeMode: Stretch</h1>
        <BetterImg
          src="/img/puppy.jpg"
          height={400}
          resizeMode="stretch"
        />
      </div>
    );
  }
};
