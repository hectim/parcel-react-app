import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators  } from 'redux';
import * as _ from 'lodash';

import * as GraphActions from './actions';
import { RootState } from '../rootState';


// TODO move the logo
let logo = require('../logo.svg')


interface PropsFromState {
  fetching: boolean;
  imgSrc: string;
  error: string;
}

interface PropsFromDispatch {
  onRequestGraph: () => void;
  cancelRequestGraph: () => void;
  requestAddNode: () => void;
  // another example:
  // onRequestGraph: (value:string) => void;
}

interface ReduxProps extends PropsFromState, PropsFromDispatch {}


class Graph extends React.Component<ReduxProps, {}> {
  constructor(props: ReduxProps) {
    super(props);
  }

  componentWillReceiveProps() {
  }

  render() {
    const { fetching, imgSrc, error, onRequestGraph, requestAddNode, cancelRequestGraph } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={imgSrc || logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Graph Saga</h1>
        </header>

        {imgSrc ? (
          <p className="App-intro">Keep clicking for new graphs</p>
        ) : (
          <p className="App-intro">Replace the React icon with a graph!</p>
        )}

        {fetching ? (
          <button disabled>fetching...</button>
        ) : (
          <div>
            <button onClick={onRequestGraph}>Request a graph</button>
            <br />
            <button onClick={requestAddNode}>Request Add Node</button>
          </div>
        )}

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

        <button onClick={cancelRequestGraph}>Cancel API call</button>
        <br />
      </div>
    );
  }
}


function mapStateToProps(state: RootState): PropsFromState {
  return {
    fetching: state.graph.fetching,
    imgSrc: state.graph.imgSrc,
    error: state.graph.error
  }
};

function mapDispatchToProps(dispatch: Dispatch<RootState>): PropsFromDispatch {
  return bindActionCreators({
  onRequestGraph:  GraphActions.graphRequest,
  cancelRequestGraph: GraphActions.graphCancel,
  requestAddNode: GraphActions.requestAddNode,
  }, dispatch);
}

export default connect<PropsFromState, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Graph);

