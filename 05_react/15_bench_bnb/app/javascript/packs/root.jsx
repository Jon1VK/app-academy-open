import React from 'react';
import ReactDOM from 'react-dom';
import * as APIUtil from '../frontend/util/session_api_util';

window.APIUtil = APIUtil;

const Hello = (props) => <div>Hello {props.name}!</div>;

ReactDOM.render(<Hello name="React" />, document.getElementById('root'));
