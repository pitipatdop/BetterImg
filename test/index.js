import React from 'react';
import { mount, shallow } from 'enzyme';

const expect = require('chai').expect;
const BetterImg = require('../src');

// describe('BetterImg', function() {
//   describe('all', function() {
//     it('should be an array of value|label', function(){
//       expect(true).to.equal(true);
//     });
//   });
// });
//
describe('<BetterImg />', () => {
  it('renders one <img /> components', () => {
    const wrapper = shallow(<BetterImg />);
    expect(wrapper.find('img')).to.have.length(1);
  });

});
