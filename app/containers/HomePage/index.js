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
import Peer from 'peerjs';
import messages from './messages';
import { listenToViewer, emitIdToShower } from 'socket-client';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.peer = new Peer();
    this.peer.on('open', this.getPeerId);
  }

  state = {
    id: null
  }

  getPeerId = (id) => {
    this.setState({
      id
    })
  }

  callViewer = (id) => {
    var call = this.peer.call(id, this.mediaStream);
  }

  startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(this.handleSuccess);
  }
  
  handleSuccess = (stream) => {
    this.mediaStream = stream;
    listenToViewer(this.callViewer); 
    let audio = document.getElementById("source");
    audio.srcObject = stream;   
  }

  showStream = () => {
    this.peer.on('call', function(call) {
      // Answer the call, providing our mediaStream
      call.answer();
      call.on("stream", (stream) => {
        let audio = document.getElementById("dest");
        audio.srcObject = stream;
      });
    });
    emitIdToShower(this.state.id)
  }

  render() {
    return (
      <h1>
        <video autoPlay={true} id="source" ></video>
        <button onClick={this.startCamera}>Camera</button>
        <button onClick={this.showStream}>Show me Joe</button>
        <video autoPlay={true} id="dest"></video>
      </h1>
    );
  }
}
