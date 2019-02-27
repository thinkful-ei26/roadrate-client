
import React from 'react';
import Enzyme, {shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyPlatesList from '../components/my-plates-list';

Enzyme.configure({adapter: new Adapter()});

describe('<MyPlatesList />', () => {
  it('Renders without crashing', () => {
    shallow(<MyPlatesList />);
  });

  it('Renders contents initially', () => {
    const wrapper = mount(<MyPlatesList />)

    expect(wrapper.find('.plates').exists())
  });
});