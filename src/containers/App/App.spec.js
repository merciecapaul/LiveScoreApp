import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import app from '../../reducers/matchReducer'
import thunkMiddleware from 'redux-thunk'
import App from './';

describe('App', () => {
  const initial_state = {
    matches: []
  };

  function setup() {
    const props = {
      store: createStore(
        combineReducers({
          app
        }),
        initial_state,
        applyMiddleware(thunkMiddleware)
      )
    };
  
    const component = <BrowserRouter><Provider {...props}><App /></Provider></BrowserRouter>
    return {
      mountWrapper: mount(component),
      shallowWrapper: shallow(component)
    };
  }

  const {shallowWrapper, mountWrapper} = setup();

  it('should render the component', () => {
    expect(shallowWrapper).toHaveLength(1);
  });

  it('expects App element exist', () => {
    expect(mountWrapper.find('.app').length).toBe(1);
  });
});
