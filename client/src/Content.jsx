import React, { Component, Fragment } from "react";
import { Row, Col, Skeleton, List, Modal } from "antd";

import api from "./api";
import CreateNew from "./CreateNew";
import { StyledNote } from "./components/LayoutComponents";
import DetailModal from "./components/DetailModal";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      deleting: false,
      detailModal: null,
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
  deleteNote = (event, id) => {
    event.stopPropagation();
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
          detailModal: null,
        });
      });
  };
  showDetail = id => {
    this.setState({
      detailModal: id,
    });
  };
  hideDetailModal = () => {
    this.setState({
      detailModal: null,
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
    const { detailModal } = this.state;
    return (
      <Fragment>
        <CreateNew createdNew={this.createdNew} />
        <List
          grid={{ gutter: 16, lg: 4, md: 3, sm: 2 }}
          dataSource={this.state.data}
          renderItem={item => (
            <StyledNote
              key={item.id}
              title={item.title}
              loading={this.state.deleting}
              onClick={() => this.showDetail(item.id)}
              onDelete={event => this.deleteNote(event, item.id)}
            >
              {item.text}
            </StyledNote>
          )}
        />
        <Modal
          visible={!!detailModal}
          closable={false}
          onCancel={this.hideDetailModal}
          footer={null}
          destroyOnClose
        >
          <DetailModal
            id={detailModal}
            deleteNote={this.deleteNote}
            closeModal={this.hideDetailModal}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default Content;
