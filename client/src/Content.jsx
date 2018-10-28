import React, { Component } from "react";
import { Row, Col, Skeleton, List } from "antd";

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
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={this.state.data}
        renderItem={item => <Note title={item.title}>{item.text}</Note>}
      />
    );
  }
}

export default Content;
