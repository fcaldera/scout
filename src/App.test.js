import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import Modal from './Modal';
import store from './store';

ReactWrapper.prototype.findByTestId = function(id) {
  return this.find(`[data-test-id="${id}"]`);
};

jest.mock('axios');

const exchangeRates = {
  data: {
    date: '2018-12-19',
    rates: { FOO: 1.11, BAR: 2.22, TAR: 3.33 },
  },
};

const flushAllPromises = () => new Promise(resolve => setTimeout(resolve, 0));

const render = () =>
  mount(
    <Provider store={store()}>
      <App />
    </Provider>
  );

it('renders without crashing', () => {
  render();
});

it('shows loader and data on success', async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(exchangeRates)));
  const component = render();

  expect(component.findByTestId('button')).toExist();
  expect(component.findByTestId('spinner')).not.toExist();
  expect(component.findByTestId('data')).not.toExist();

  const button = component.findByTestId('button').hostNodes();
  button.simulate('click');

  expect(component.findByTestId('button')).not.toExist();
  expect(component.findByTestId('spinner')).toExist();
  expect(component.findByTestId('data')).not.toExist();

  await flushAllPromises();
  component.update();

  expect(component.findByTestId('button')).not.toExist();
  expect(component.findByTestId('spinner')).not.toExist();
  expect(component.findByTestId('data')).toExist();

  expect(component.findByTestId('data-record')).toHaveLength(3);
  expect(component.findByTestId('data')).toHaveText('FOO1.11BAR2.22TAR3.33');
});

it('shows a disposable modal on failure', async () => {
  axios.get.mockReturnValue(
    new Promise((resolve, reject) => reject(new Error('the-error')))
  );

  const component = render();

  const button = component.findByTestId('button').hostNodes();
  button.simulate('click');
  await flushAllPromises();
  component.update();

  expect(component.findByTestId('modal-error')).toExist();
  expect(component.findByTestId('modal-error-msg')).toHaveText('the-error');

  const closeButton = component.findByTestId('close-button').hostNodes();
  closeButton.simulate('click');

  expect(component.findByTestId('button')).toExist();
  expect(component.findByTestId('spinner')).not.toExist();
  expect(component.findByTestId('data')).not.toExist();
});

// it('loads data on button click', () => {
//   const spy = jest.fn();
//   const wrapper = mount(<App fetchExchanges={spy} />);
//   const button = wrapper.find('button');
//   button.simulate('click');
//   expect(spy).toBeCalled();
// });

// it('renders a spinner when loading', () => {
//   const wrapper = mount(<App loading />);
//   expect(wrapper.find('Spinner')).toExist();
// });

// it('renders data', () => {
//   const data = { rates: { foo: 'bar', tar: 'taz' } };
//   const wrapper = mount(<App data={data} />);
//   expect(wrapper.find('table')).toHaveText('foobartartaz');
// });

// it('shows a modal on error', () => {
//   const wrapper = mount(<App error="foo" />);
//   const modal = wrapper.find(Modal);
//   expect(modal).toIncludeText('foo');
// });

// it('closes modal on button click', () => {
//   const spy = jest.fn();
//   const wrapper = mount(<App error="foo" resetError={spy} />);
//   const button = wrapper.find('button');
//   button.simulate('click');
//   expect(spy).toBeCalled();
// });
