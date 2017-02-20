import React, { Component, PropTypes } from 'react';
const elementResizeDetectorMaker = require("element-resize-detector");

const calculateScale = (resizeMode, containerWidth, containerHeight, imgWidth, imgHeight) => {

  const containerImgWidthRatio = containerWidth / imgWidth;
  const containerImgHeightRatio = containerHeight / imgHeight;

  switch (resizeMode) {
    case 'cover':
      return {
        scaleX: Math.max(containerImgWidthRatio, containerImgHeightRatio),
        scaleY: Math.max(containerImgWidthRatio, containerImgHeightRatio),
      }
    case 'stretch':
      return {
        scaleX: containerImgWidthRatio,
        scaleY: containerImgHeightRatio,
      };
    case 'repeat':
      return {
        scaleX: 1,
        scaleY: 1,
      };
    case 'contain':
    default:
      return {
        scaleX: Math.min(containerImgWidthRatio, containerImgHeightRatio),
        scaleY: Math.min(containerImgWidthRatio, containerImgHeightRatio),
      }
  }
}

class BetterImg extends Component {

  erd = null;

  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number.isRequired,
    resizeMode: PropTypes.oneOf([
      'cover',
      'contain',
      'stretch',
      // 'repeat'
    ]),
  }

  static defaultProps = {}

  state = {
    imgWidth: 0,
    imgHeight: 0,
    containerWidth: undefined,
    containerHeight: undefined,
  }

  handleOnLoad = (e) =>{
    const imgWidth = e.target.offsetWidth;
    const imgHeight = e.target.offsetHeight;

    // Set Component Height to props.height (if set), else use imgHeight
    this.setState({
      imgWidth,
      imgHeight,
      containerHeight: this.props.height || imgHeight,
    });

    //Fire handleUpdateSize once to trigger calculation
    this.handleUpdateSize();
  }

  componentDidMount() {
    if (!this.erd) this.erd = elementResizeDetectorMaker();
    this.erd.listenTo(this.container, this.handleUpdateSize);
  }

  componentWillUnmount() {
    this.erd.removeListener(this.container, this.handleUpdateSize);
  }

  handleUpdateSize = (element) => {
    // Set Component Width to props.width (if set), or containerWidth
    const el = element || this.container;
    const containerWidth = el.offsetWidth;
    this.setState({
      containerWidth: containerWidth,
    });
  }

  render() {

    // If no resizeMode is provided, be normal <img />
    if (!this.props.resizeMode) return (<img {...this.props} />);

    // If props.width is provide, use it, else use containerWidth for calculation
    const containerWidth = this.props.width || this.state.containerWidth;
    const containerHeight = this.state.containerHeight;

    const { src, resizeMode } = this.props;
    const { imgWidth, imgHeight } = this.state;

    const wrapperStyles = {
      overflow: 'hidden',
      // If props.width is provide, use it, else no need to control container's width
      width: this.props.width ? this.props.width : undefined,
      height: containerHeight,
      border: '1px solid black',
    };

    // Calcualte Scale
    let { scaleX, scaleY } = calculateScale(resizeMode, containerWidth, containerHeight, imgWidth, imgHeight);

    // Center by default
    let x = .5 * (containerWidth - imgWidth);
    let y = .5 * (containerHeight - imgHeight);

    const imgStyle = {
      WebkitTransform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
      transform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
    }

    const imgProps = _.omit(this.props, ['width', 'height']);
    return (
      <div className="better-img" style={wrapperStyles} ref={container => this.container = container}>
        <img
          {...imgProps}
          src={src}
          style={imgStyle}
          onLoad={this.handleOnLoad}
        />
      </div>
    )
  }
};

export default BetterImg;
