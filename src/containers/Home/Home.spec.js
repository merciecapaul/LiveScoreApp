import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import Home from './';
import app from '../../reducers/matchReducer'

describe('Home', () => {
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
  
    const component = <BrowserRouter><Provider {...props}><Home /></Provider></BrowserRouter>
    return {
      mountWrapper: mount(component),
      shallowWrapper: shallow(component)
    };
  }

  const {shallowWrapper, mountWrapper} = setup();

  it('should render the component', () => {
    expect(shallowWrapper).toHaveLength(1);
  });

  it('expects Home element exist', () => {
    expect(mountWrapper.find('.home').length).toBe(1);
  });
});
