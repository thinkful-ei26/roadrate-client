
import React from 'react';
import Enzyme, {shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReviewList from '../components/ReviewList';

Enzyme.configure({adapter: new Adapter()});

describe('<ReviewList />', () => {
  it('Renders without crashing', () => {
    shallow(<ReviewList />);
  });

  it('Renders contents initially', () => {
    const wrapper = mount(<ReviewList />)

    expect(wrapper.find('.review-title').exists())
    expect(wrapper.find('#elapsed-time').exists())
    expect(wrapper.find('.review-rating').exists())
    expect(wrapper.find('.message').exists())
    expect(wrapper.find('#review-date').exists())
    expect(wrapper.find('#THISHOULDNTWORK').exists())
  });
});