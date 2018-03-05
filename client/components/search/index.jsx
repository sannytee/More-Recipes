import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import axios from 'axios';
import fetch from 'isomorphic-fetch';
import 'react-select/dist/react-select.css';

/* eslint-disable require-jsdoc */
class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backspaceRemoves: true,
      multi: true,
      creatable: false,
      value: '',
    };

    this.onChange = this.onChange.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.gotoUser = this.gotoUser.bind(this);
    this.toggleBackspaceRemoves = this.toggleBackspaceRemoves.bind(this);
  }

  onChange(value) {
    this.setState({
      value,
    });
  }

  /* eslint-disable class-methods-use-this  */
  getUsers(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch(`https://api.github.com/search/users?q=${input}`)
      .then((response) => response.json())
      .then((json) => {
        return { options: json.items };
      });
  }

  gotoUser(value) {
    window.open(value.html_url);
  }

  toggleBackspaceRemoves() {
    this.setState({
      backspaceRemoves: !this.state.backspaceRemoves
    });
  }

  render() {
    const AsyncComponent = Select.Async;

    return (
      <div style={{ marginRight: 'auto', marginLeft: 'auto', width: '300px' }}>
        <div className="section">
          <h3 className="section-heading">test <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/GithubUsers.js">(Source)</a></h3>
          <AsyncComponent
            multi={this.state.multi}
            value={this.state.value}
            onChange={this.onChange}
            onValueClick={this.gotoUser}
            valueKey="id"
            labelKey="login"
            loadOptions={this.getUsers}
            backspaceRemoves={this.state.backspaceRemoves}
          />
        </div>
      </div>
    );
  }
}

export default TestComponent;
