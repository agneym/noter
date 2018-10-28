import React, { Component } from "react";
import { Row, Col, Skeleton } from "antd";

import Note from "./Note";
import api from "./api";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }
  componentDidMount() {
    this.getAllNotes();
  }
  getAllNotes = () => {
    this.setState({
      loading: true,
    });
    api.notes
      .list()
      .then(response => {
        this.setState({
          loading: false,
          data: response.data.result,
        });
      })
      .catch(console.error)
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    if (this.state.loading) {
      return (
        <Row>
          {[1, 2, 3].map(() => (
            <Col span={8}>
              <Skeleton active />
            </Col>
          ))}
        </Row>
      );
    }
    return (
      <Row>
        {this.state.data.map(item => (
          <Col span={8}>
            <Note title={item.title} text={item.text} />
          </Col>
        ))}
      </Row>
    );
  }
}

export default Content;
