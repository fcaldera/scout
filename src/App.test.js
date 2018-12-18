import React from 'react';
import { mount } from 'enzyme';
import { App } from './App';
import Modal from './Modal';

it('renders without crashing', () => {
  mount(<App />);
});

it('renders only a button by default', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('button')).toExist();
  expect(wrapper.find('Spinner')).not.toExist();
  expect(wrapper.find('table')).not.toExist();
});

it('loads data on button click', () => {
  const spy = jest.fn();
  const wrapper = mount(<App fetchExchanges={spy} />);
  const button = wrapper.find('button');
  button.simulate('click');
  expect(spy).toBeCalled();
});

it('renders a spinner when loading', () => {
  const wrapper = mount(<App loading />);
  expect(wrapper.find('Spinner')).toExist();
});

it('renders data', () => {
  const data = { rates: { foo: 'bar', tar: 'taz' } };
  const wrapper = mount(<App data={data} />);
  expect(wrapper.find('table')).toHaveText('foobartartaz');
});

it('shows a modal on error', () => {
  const wrapper = mount(<App error="foo" />);
  const modal = wrapper.find(Modal);
  expect(modal).toIncludeText('foo');
});

it('closes modal on button click', () => {
  const spy = jest.fn();
  const wrapper = mount(<App error="foo" resetError={spy} />);
  const button = wrapper.find('button');
  button.simulate('click');
  expect(spy).toBeCalled();
});
