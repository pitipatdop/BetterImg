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
- `focalPoint`: default=`.5 .5` (work if resizeMode = 'cover')
  Decides origin of the where to focus on the image,
  - `left`: Keep left most part of the image.
  - `right`: Keep right most part of the image.
  - `top`: Keep top most part of the image.
  - `bottom`: Keep bottom most part of the image.
  - `{x} {y}`: (eg. `focalPoint=".75 .5"` or `focalPoint="75% 50%"`) focus on the point `x%` from the left and `y%` from the top.
- `scale`: (work if resizeMode = 'cover') if provided, the image will scale from container width. (Not image original width)

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

      <BetterImg
        src="/img/puppy.jpg"
        height={600}
        resizeMode="cover"
        focalPoint=".75 .5"
      />
    </div>
  )
}
```
