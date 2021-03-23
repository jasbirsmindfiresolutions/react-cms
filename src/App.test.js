import App from './App';

import { shallow } from 'enzyme';

describe('App', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('render greet block', () => {

    expect( 
      wrapper.find('#greet').text() 
    ).toContain('TDD')

  });

});
