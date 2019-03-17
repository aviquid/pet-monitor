/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import messages from './messages';
import { emitVideoData } from 'socket-client';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(this.handleSuccess);
  }
  
  handleSuccess = (stream) => {
    const options = {mimeType: 'video/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        emitVideoData(e.data);
      }
    });

    mediaRecorder.start();
  }


  render() {
    return (
      <h1>
        <button onClick={this.startCamera}>Camera</button>
      </h1>
    );
  }
}
