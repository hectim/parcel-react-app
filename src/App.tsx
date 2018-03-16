import * as React from "react";

import "./App.css";
import Dog from './dog/component';
import Graph from './graph/component';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Dog  parentPropsExample={"a prop"}/>
        <br />

        <Graph />
      </div>
    );
  }
}
