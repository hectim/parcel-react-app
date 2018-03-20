import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators  } from 'redux';
import * as _ from 'lodash';

import { Node } from './reducer'

import * as GraphActions from './actions';
import { RootState } from '../rootState';


// TODO move the logo
let logo = require('../logo.svg')


interface PropsFromState {
  nodeLoading:boolean;
  nodes:Array<Node>;
  labelLoading:boolean;
  labels:Map<string, number>;
};

interface PropsFromDispatch {
  requestAddNode: () => void;
  createLabelRequest: () => void;
  deleteLabelRequest: () => void;
  updateLabelRequest: () => void;
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
    const { nodes, nodeLoading, labelLoading, labels, requestAddNode, createLabelRequest, deleteLabelRequest, updateLabelRequest } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Graph Saga</h1>
        </header>

        {nodeLoading ? (
          <button disabled>fetching...</button>
        ) : (
          <div>
            <button onClick={requestAddNode}>Request Add Node</button>
          </div>
        )}
        { nodes.forEach((node) => <span>{node}</span>) }
        <br />

        {labelLoading ? (
        <button disabled>fetching...</button>
        ) : (
        <div>
          <button onClick={createLabelRequest}>Request Create Label</button>
          <button onClick={deleteLabelRequest}>Request Delete Label</button>
          <button onClick={updateLabelRequest}>Request Update Label</button>
        </div>
        )}
        {labels}
        <br />
      </div>
    );
  }
}

function mapStateToProps(state: RootState): PropsFromState {
  return {
    nodeLoading: state.graph.nodes.isLoading,
    nodes: state.graph.nodes.nodes,
    labelLoading: state.graph.labels.isLoading,
    labels: state.graph.labels.labels,
  };
};

function mapDispatchToProps(dispatch: Dispatch<RootState>): PropsFromDispatch {
  return bindActionCreators({
    requestAddNode: GraphActions.requestAddNode,
    createLabelRequest: GraphActions.createLabelRequest,
    deleteLabelRequest: GraphActions.deleteLabelRequest,
    updateLabelRequest: GraphActions.updateLabelRequest,
  }, dispatch);
}

export default connect<PropsFromState, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Graph);

