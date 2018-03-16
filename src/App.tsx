import * as React from "react";

import "./App.css";
import Dog from './dog/component';
import Graph from './graph/component';
import { RootState } from './rootState';



export default class App extends React.Component<any,RootState> {
  render() {
    return (
      <div>
        <Dog parentPropsExample={"a prop"}/>
        <br />

        <Graph />
      </div>
    )
  }
};
