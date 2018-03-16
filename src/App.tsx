import * as React from "react";

import "./App.css";
import Dog from './dog/component';
// import Graph from './graph/component';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Dog  parentPropsExample={"a prop"}/>
        <br />

      </div>
    );
  }
}
  // <Graph />
