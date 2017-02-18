import React, { Component, PropTypes } from 'react';

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
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleUpdateSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleUpdateSize);
  }

  handleUpdateSize = () => {
    // Set Component Width to props.width (if set), or containerWidth
    console.log('size', this.container.offsetWidth);
    const containerWidth = this.container.offsetWidth;
    this.setState({
      containerWidth: this.props.width || containerWidth,
    });
  }

  render() {

    // If no resizeMode is provided, be normal <img />
    if (!this.props.resizeMode) return (<img {...this.props} />);

    const containerWidth = this.props.width || this.state.containerWidth;
    const containerHeight = this.state.containerHeight;
    console.log('container (w, h) = ', containerWidth, containerHeight);

    const { src, resizeMode } = this.props;
    const { imgWidth, imgHeight } = this.state;

    const wrapperStyles = {
      overflow: 'hidden',
      width: containerWidth,
      height: containerHeight,
      border: '1px solid black',
    };

    // ByHeight
    let { scaleX, scaleY } = calculateScale(resizeMode, containerWidth, containerHeight, imgWidth, imgHeight);

    // Center
    let x = .5 * (containerWidth - imgWidth);
    let y = .5 * (containerHeight - imgHeight);

    const imgStyle = {
      WebkitTransform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
      transform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
    }

    return (
      <div className="better-img" style={wrapperStyles} ref={container => this.container = container}>
        <img
          src={src}
          style={imgStyle}
          onLoad={this.handleOnLoad}
        />
      </div>
    )
  }
};


export default BetterImg;
