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
    this.videoRef = React.createRef();
  }

  state = {
    id: null,
    mediaStream: null
  }

  getPeerId = (id) => {
    this.setState({
      id
    })
  }

  callViewer = (id) => {
    var call = this.peer.call(id, this.state.mediaStream);
  }

  startCamera = () => {
    navigator.mediaDevices.getUserMedia({video: { facingMode: "environment" } })
    .then(this.handleSuccess);
  }
  
  handleSuccess = (stream) => {
    listenToViewer(this.callViewer); 
    this.setState({
      mediaStream: stream
    }, this.setVideoRef)   
  }

  showStream = () => {
    this.peer.on('call', (call) => {
      // Answer the call, providing our mediaStream
      call.answer();
      call.on("stream", (stream) => {
        this.setState({
          mediaStream: stream
        }, this.setVideoRef) 
      });
    });
    emitIdToShower(this.state.id)
  }

  setVideoRef = () => {
    this.videoRef.current.srcObject = this.state.mediaStream;
  }

  render() {
    return (
      <div>
        <h1>Pet Monitor</h1>
        <button onClick={this.startCamera}>Camera</button>
        <button onClick={this.showStream}>Show me Joe</button>
        <video autoPlay={true} id="dest" ref={this.videoRef}></video>
      </div>
    );
  }
}
