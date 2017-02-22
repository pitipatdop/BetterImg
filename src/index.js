import React, { Component, PropTypes } from 'react';
import pick from 'lodash/pick';

const elementResizeDetectorMaker = require("element-resize-detector");

const imgAttrs = [
  "align",
  "alt",
  "crossorigin",
  "height",
  "hspace",
  "ismap",
  "longdesc",
  "sizes",
  "src",
  "srcset",
  "usemap",
  "vspace",
  "width",
];

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
    zoomInScale: PropTypes.number,
    focalPoint: PropTypes.string,
    clickToZoom: PropTypes.bool,
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
    zoomInScale: 2,
    clickToZoom: false,
  }

  state = {
    imgWidth: 0,
    imgHeight: 0,
    imgLoaded: false,
    imgClicked: false,
    currentZoomScale: this.props.scale,
    focalPoint: this.props.focalPoint,
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
      imgLoaded: true,
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

  handleClick = (e) => {
    e.stopPropagation();
    const { clickToZoom } = this.props;
    if (clickToZoom) {
      // console.log('BetterImg', e.nativeEvent.clientX, e.nativeEvent.clientY);
      // console.log('Parent', this.container.getBoundingClientRect());
      const { left, top } = this.container.getBoundingClientRect();
      const pointX = e.nativeEvent.clientX - left;
      const pointY = e.nativeEvent.clientY - top;
      // console.log('pointX,Y = ', pointX, pointY);
      const containerWidth = this.props.width || this.state.containerWidth;
      const containerHeight = this.state.containerHeight;

      if (!this.state.isZoomedIn) {
        this.setState({
          isZoomedIn: true,
          imgClicked: true,
          currentZoomScale: this.props.zoomInScale,
          focalPoint: `${pointX/containerWidth} ${pointY/containerHeight}`
        });
      } else {
        this.setState({
          isZoomedIn: false,
          imgClicked: true,
          currentZoomScale: this.props.scale,
          focalPoint: 'center',
        });
      }
    }
  }

  render() {

    // If no resizeMode is provided, be normal <img />
    if (!this.props.resizeMode) {
      const imgProps = pick(this.props, imgAttrs);
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
    if (resizeMode === 'cover' && this.state.currentZoomScale) {
      scaleX = this.state.currentZoomScale * scaleX;
      scaleY = this.state.currentZoomScale * scaleY;
    }

    // Focal Point (cover only)
    let focalPointX = .5;
    let focalPointY = .5;
    if (resizeMode === 'cover') {
      let focalPoint = mapFocalPointProps(this.state.focalPoint);
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
    if (this.props.clickToZoom && this.state.imgClicked) imgStyle.transition = 'all .3s ease-out';

    const containerProps = {};
    if (this.props.clickToZoom) {
      containerProps.onClick = this.handleClick;
    }
    const imgProps = pick(this.props, imgAttrs);
    return (
      <div
        className="better-img"
        style={wrapperStyles}
        ref={container => this.container = container}
        {...containerProps}
      >
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
