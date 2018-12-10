import React from 'react';
import { css } from 'react-emotion';
import { RingLoader } from 'react-spinners';
 
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    z-index: -1;
    
`;
 
class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    
    return (
      <div className='sweet-loading-two'>
        <RingLoader
          className={override}
          sizeUnit={"px"}
          size={75}
          color={'#42d7f4'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default Spinner