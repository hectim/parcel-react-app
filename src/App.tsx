import * as React from "react";

import "./App.css";
import Dog from './dog/component';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Dog  parentPropsExample={"a prop"}/>
      </div>
    );
  }
}
