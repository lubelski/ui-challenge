import React, { Component } from "react";
import "../node_modules/bulma/css/bulma.css";
import "./App.css";
import SidePanel from "./components/SidePanel";
import MainDisplay from "./components/MainDisplay";
class App extends Component {
  state = { data: [], itemForMain: undefined, loading: true };
  componentDidMount() {
    fetch(`/data/schema.json`)
      .then(res => res.json())
      .then(data => this.setState({ data, loading: false }));
  }
  handleItemClick = item => {
    const newData = this.state.data.map(obj => {
      if (obj.containing_object && obj.containing_object.id === item.id) {
        obj.areSubItemsVisible = !obj.areSubItemsVisible;
      } else {
        // close all others so only 1 is open at a time
        obj.areSubItemsVisible = false;
      }
      return obj;
    });
    this.setState({ itemForMain: item, data: newData });
  };
  addRef = item => {
    let { properties } = this.state.itemForMain;
    // copy the obj
    let obj = Object.assign({}, this.state.itemForMain);

    obj.properties = properties.map(prop => {
      // add active for the ref
      if (prop.id === item.id) {
        prop.isActive = true;
      }
      return prop;
    });
    this.setState({ itemForMain: obj });
  };
  render() {
    const { data, itemForMain, loading } = this.state;
    return (
      <div>
        <nav className="nav">
          <div className="nav-left">
            App
          </div>
        </nav>
        <div className="columns">
            {
              loading ?
               <span className="loading">Loading...</span> : 
          <div className="column is-one-quarter">
                 <SidePanel
                  addRef={this.addRef}
                  data={data}
                  handleItemClick={this.handleItemClick}
                />
          </div>
            }
          <main className="column">
            {itemForMain ? <MainDisplay item={itemForMain} /> : undefined}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
