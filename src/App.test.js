import App from './App';

import { shallow } from 'enzyme';

describe('App', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('render signin block', () => {

    expect( 
      wrapper.find('#greet').text() 
    ).toContain('Sign')

  });

});
