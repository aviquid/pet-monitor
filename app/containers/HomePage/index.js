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
import { listenToViewer, emitIdToShower } from 'socket-client';
import Button from 'components/Button';

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
    mediaStream: null,
  };

  getPeerId = id => {
    this.setState({
      id,
    });
  };

  callViewer = id => {
    this.peer.call(id, this.state.mediaStream);
  };

  startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(this.handleSuccess);
  };

  handleSuccess = stream => {
    listenToViewer(this.callViewer);
    this.setState(
      {
        mediaStream: stream,
      },
      this.setVideoRef,
    );
  };

  showStream = () => {
    this.peer.on('call', call => {
      // Answer the call, providing our mediaStream
      call.answer();
      call.on('stream', stream => {
        this.setState(
          {
            mediaStream: stream,
          },
          this.setVideoRef,
        );
      });
    });
    emitIdToShower(this.state.id);
  };

  setVideoRef = () => {
    this.videoRef.current.srcObject = this.state.mediaStream;
  };

  render() {
    return (
      <div>
        <h1>Pet Monitor</h1>
        <Button onClick={this.startCamera}>Camera</Button>
        <Button onClick={this.showStream}>Show me Joe</Button>
        <video autoPlay id="dest" ref={this.videoRef} />
      </div>
    );
  }
}
