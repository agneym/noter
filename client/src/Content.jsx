import React, { Component, Fragment } from "react";
import { Row, Col, Skeleton, List } from "antd";

import Note from "./Note";
import api from "./api";
import CreateNew from "./CreateNew";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      deleting: false,
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
  createdNew = note => {
    this.setState(prevState => ({
      data: [note, ...prevState.data],
    }));
  };
  deleteNote = id => {
    this.setState({
      deleting: true,
    });
    api.notes
      .remove(id)
      .then(() => {
        this.setState(prevState => ({
          data: prevState.data.filter(item => item.id !== id),
        }));
      })
      .finally(() => {
        this.setState({
          deleting: false,
        });
      });
  };
  render() {
    if (this.state.loading) {
      return (
        <Row>
          {[1, 2, 3].map(item => (
            <Col span={8} key={item}>
              <Skeleton active />
            </Col>
          ))}
        </Row>
      );
    }
    return (
      <Fragment>
        <CreateNew createdNew={this.createdNew} />
        <List
          grid={{ gutter: 16, lg: 4, md: 3, sm: 2 }}
          dataSource={this.state.data}
          renderItem={item => (
            <Note
              key={item.id}
              title={item.title}
              loading={this.state.deleting}
              onDelete={() => this.deleteNote(item.id)}
            >
              {item.text}
            </Note>
          )}
        />
      </Fragment>
    );
  }
}

export default Content;
