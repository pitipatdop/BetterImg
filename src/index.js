import React, { Component, PropTypes } from 'react';
import omit from 'lodash/omit';

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

const convertPercentToDecimal = (num) => {
  if (num.indexOf('%') !== -1) return parseFloat(num) / 100.0;
  return num;
};

const mapFocalPointProps = (key) => {
  switch (key) {
    case 'center': return { focalPointX: .5, focalPointY: .5 };
    case 'left': return { focalPointX: 0, focalPointY: .5 };
    case 'right': return { focalPointX: 1, focalPointY: .5 };
    case 'top': return { focalPointX: 0.5, focalPointY: 0 };
    case 'bottom': return { focalPointX: 0.5, focalPointY: 1 };
  }

  const [focalX, focalY] = key.split(' ');
  if (focalX && focalY) {
    return {
      focalPointX: convertPercentToDecimal(focalX),
      focalPointY: convertPercentToDecimal(focalY)
    };
  }

  // Else return center
  return { focalPointX: .5, focalPointY: .5 };
};

class BetterImg extends Component {

  erd = null;

  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number,
    focalPoint: PropTypes.string,
    resizeMode: PropTypes.oneOf([
      'cover',
      'contain',
      'stretch',
      // 'repeat'
    ]),
  }

  static defaultProps = {
    scale: 1,
    focalPoint: 'center',
  }

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
    if (!this.props.resizeMode) {
      const imgProps = omit(this.props, ['focalPoint', 'resizeMode', 'scale']);
      return (<img {...imgProps} />);
    }

    // If props.width is provide, use it, else use containerWidth for calculation
    const containerWidth = this.props.width || this.state.containerWidth;
    const containerHeight = this.state.containerHeight;

    const { src, resizeMode } = this.props;
    const { imgWidth, imgHeight } = this.state;

    const wrapperStyles = {
      overflow: 'hidden',
      position: 'relative',
      // If props.width is provide, use it, else no need to control container's width
      width: this.props.width ? this.props.width : undefined,
      height: containerHeight,
    };

    // Calculate Scale
    let { scaleX, scaleY } = calculateScale(resizeMode, containerWidth, containerHeight, imgWidth, imgHeight);
    if (resizeMode === 'cover' && this.props.scale) {
      scaleX = this.props.scale * scaleX;
      scaleY = this.props.scale * scaleY;
    }

    // Focal Point (cover only)
    let focalPointX = .5;
    let focalPointY = .5;
    if (resizeMode === 'cover') {
      let focalPoint = mapFocalPointProps(this.props.focalPoint);
      focalPointX = focalPoint.focalPointX;
      focalPointY = focalPoint.focalPointY;
    }

    // Calculate X,Y
    let x = focalPointX * (containerWidth - scaleX * imgWidth);
    let y = focalPointY * (containerHeight - scaleY * imgHeight);

    const imgStyle = {
      WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`,
      transform: `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`,
      transformOrigin: '0% 0%',
    }

    const imgProps = omit(this.props, ['width', 'height', 'focalPoint', 'scale', 'resizeMode']);
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
