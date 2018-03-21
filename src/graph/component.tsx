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
  requestRemoveNode: (node: GraphNode) => void;
  requestUpdateNode: (node: GraphNode) => void;
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
    const { nodes, nodeLoading, labelLoading, labels, requestAddNode, requestRemoveNode, requestUpdateNode, createLabelRequest, deleteLabelRequest, updateLabelRequest } = this.props;

    let labelDisplay:JSX.Element[] = []
    labelDisplay.push(<div key="lap">Label Map:</div>)
    labels.forEach((value: number, key: string) => {
      labelDisplay.push(
        <div key={key}> [ key:{key} - value:{value} ]
          <button key={key+'update'} onClick={() => updateLabelRequest(
            { img: key, nodeId: value }
          )}>Update</button>
          <button key={key+'delete'} onClick={() => deleteLabelRequest(
            { img: key, nodeId: value }
          )}>Delete</button>
        </div>
      )
    })

    let nodeDisplay:JSX.Element[] = []
    nodeDisplay.push(<div key="nar">Node Array:</div>)
    nodes.forEach((node: GraphNode, i: number) => {
      nodeDisplay.push(
        <div key={i}>type: {node.type} -- img: {node.img}
          <button key={i.toString()+'update'} onClick={() => requestUpdateNode(node)}>Update</button>
          <button key={i.toString()+'delete'} onClick={() => requestRemoveNode(node)}>Delete</button>
        </div>
      )
    })

    return (
      <div className="App">

        <div>
          <button onClick={requestAddNode}>Request Add Node</button>
          {nodeLoading && <button disabled>fetching...</button>}
        </div>
        {nodeDisplay}
        <br />

        <div>
          <button onClick={createLabelRequest}>Request Create Label</button>
          {labelLoading && <button disabled>fetching...</button>}
        </div>
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

