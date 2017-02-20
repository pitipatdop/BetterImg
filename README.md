# BetterImg

A tiny library that add extra feature for `<img />` tag.

## Props
all normal `<img />` props can be used
- `src`
- `alt`
- `width` not required. if not provide, it will use container's width.
- `height` required only if resizeMode is provided.
- `resizeMode` Implement the same way as React-native Image component https://facebook.github.io/react-native/docs/image.html#resizemode
![img](http://i.imgur.com/x4vFVmb.jpg)
  - `cover`: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding).
  - `contain`: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).
  - `stretch`: Scale width and height independently, This may change the aspect ratio of the src.

Note: If you do not provide resizeMode, `<BetterImg />` will just render normal `<img />`



## Usage
Installation using npm:
``` js
npm install better-img --save
```
``` js
import BetterImg from 'better-img';

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
```
