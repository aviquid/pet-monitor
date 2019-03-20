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
import { listenToViewer, emitIdToShower, emitCctvName, unMountRoom } from 'socket-client';
import styled from 'styled-components';
import Button from 'components/Button';
import TextInput from 'components/TextInput';

const Video = styled.video`
  display: block;
`;

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.peer = new Peer();
    this.peer.on('open', this.getPeerId);
    this.videoRef = React.createRef();
    this.videoShower = false;
  }

  state = {
    id: null,
    mediaStream: null,
    roomName: ""
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
      .getUserMedia({ audio: true, video: { facingMode: 'environment' } })
      .then(this.handleSuccess);
  };

  handleSuccess = stream => {
    window.addEventListener('beforeunload', this.cleanUpRoom);
    listenToViewer(this.callViewer);
    emitCctvName(this.state.roomName);
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
    emitIdToShower({
      id: this.state.id,
      roomName: this.state.roomName
    });
  };

  setVideoRef = () => {
    this.videoRef.current.srcObject = this.state.mediaStream;
  };

  handleTextChange = (evt) => {
    this.setState({
      roomName: evt.target.value
    })
  }

  cleanUpRoom = () => {
    unMountRoom(this.state.roomName);
    window.removeEventListener('beforeunload', this.cleanUpRoom);
  }

  render() {
    return (
      <div>
        <h1>Pet Monitor</h1>
        <TextInput type="text" value={this.state.roomName} onChange={this.handleTextChange} 
        placeholder="Enter a unorthodox room name" />
        <Button onClick={this.startCamera}>Camera</Button>
        <Button onClick={this.showStream}>Show me Joe</Button>
        <Video autoPlay ref={this.videoRef} />
      </div>
    );
  }
}
