import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators  } from 'redux';
import * as _ from 'lodash';

import { GraphNode, Label } from './types'

import * as GraphActions from './actions';
import { RootState } from '../rootState';

let logo = require('../logo.svg')


interface PropsFromState {
  nodeLoading:boolean;
  nodes:GraphNode[];
  nodesError: string;
  labelLoading:boolean;
  labels:Map<string, number>;
  labelsError: string;
};

interface PropsFromDispatch {
  requestAddNode: () => void;
  requestRemoveNode: (node: Node) => void;
  requestUpdateNode: (node: Node) => void;
  createLabelRequest: () => void;
  deleteLabelRequest: (label: Label) => void;
  updateLabelRequest: (label: Label) => void;
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

    let labelDisplay:JSX.Element[] = []
    labelDisplay.push(<div>Label Map:</div>)
    labels.forEach((value: number, key: string) => {
      labelDisplay.push(
        <div key={value}> [ key:{key} - value:{value} ]
          <button key={value+'update'} onClick={() => updateLabelRequest(
            { img: key, nodeId: value }
          )}>Update</button>
          <button key={value+'delete'} onClick={() => deleteLabelRequest(
            { img: key, nodeId: value }
          )}>Delete</button>
        </div>
      )
    })

    let nodeDisplay:JSX.Element[] = []
    nodeDisplay.push(<div>Node Array:</div>)
    nodes.forEach((node: GraphNode, i: number) => {
      nodeDisplay.push(
        <div key={i}>type: {node.type} -- img: {node.img}
          <button>Request Update Node</button>
        </div>
      )
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Graph Saga</h1>
        </header>
        <br />

        {nodeLoading ? (
          <button disabled>fetching...</button>
        ) : (
          <div>
            <button onClick={requestAddNode}>Request Add Node</button>
          </div>
        )}
        {nodeDisplay}
        <br />
        <br />

        {labelLoading ? (
        <button disabled>fetching...</button>
        ) : (
        <div>
          <button onClick={createLabelRequest}>Request Create Label</button>
        </div>
        )}
        {labelDisplay}
        <br />
      </div>
    );
  }
}

function mapStateToProps(state: RootState): PropsFromState {
  return {
    nodeLoading: state.graph.nodes.isLoading,
    nodes: state.graph.nodes.nodes,
    nodesError: state.graph.nodes.errorMsg,
    labelLoading: state.graph.labels.isLoading,
    labels: state.graph.labels.labels,
    labelsError: state.graph.labels.errorMsg,
  };
};

function mapDispatchToProps(dispatch: Dispatch<RootState>): PropsFromDispatch {
  return bindActionCreators({
    requestAddNode: GraphActions.requestAddNode,
    requestRemoveNode: GraphActions.requestRemoveNode,
    requestUpdateNode: GraphActions.requestUpdateNode,
    createLabelRequest: GraphActions.createLabelRequest,
    deleteLabelRequest: GraphActions.deleteLabelRequest,
    updateLabelRequest: GraphActions.updateLabelRequest,
  }, dispatch);
}

export default connect<PropsFromState, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Graph);

