import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';
import BasicSample from './router';

class Text extends React.Component {
  render() {
    return (
        <div>
            <BasicSample/>
        </div>
    );
  }
}
ReactDOM.render(<Text/>, document.getElementById('main'));

import $ from 'jquery';
$('body').append('<p>Hello Vendor</p>');

if (module.hot)
{
  module.hot.aceept();
}