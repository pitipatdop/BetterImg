import React, { Component } from 'react';
import BetterImg from '../../src';


export default class App extends Component {

  // handleClick = (e) => {
  //   /*
  //   pos_x = event.offsetX ? (event.offsetX) : event.pageX-document.getElementById("pointer_div").offsetLeft;
  //   pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("pointer_div").offsetTop;
  //    */
  //   console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  // }
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
          src="/img/puppy-line.jpg"
          height={600}
          resizeMode="cover"
          clickToZoom
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
