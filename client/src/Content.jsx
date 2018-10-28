import React, { Component } from "react";
import { Row, Col } from "antd";

import api from "./api";

class Content extends Component {
  componentDidMount() {
    this.getAllNotes();
  }
  getAllNotes = () => {
    api.notes
      .list()
      .then(console.log, console.log)
      .catch(console.log);
  };
  render() {
    return (
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
    );
  }
}

export default Content;
