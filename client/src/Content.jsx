import React, { Component, Fragment } from "react";
import { Row, Col, Skeleton, Modal } from "antd";

import api from "./api";
import CreateNew from "./CreateNew";
import DetailModal from "./components/DetailModal";
import ListNotes from "./components/ListNotes";

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
    const { detailModal, deleting } = this.state;
    return (
      <Fragment>
        <CreateNew createdNew={this.createdNew} />
        <ListNotes
          data={this.state.data}
          onDelete={this.deleteNote}
          onClick={this.showDetail}
          loading={deleting}
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
