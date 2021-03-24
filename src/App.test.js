import App from './App';

import { shallow } from 'enzyme';

describe('App', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('render login page', () => {

    expect( 
      wrapper.find('.App').text() 
    ).toContain('signin')

  });

});
