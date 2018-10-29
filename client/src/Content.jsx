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
      next: null,
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    this.setState({
      loading: true,
    });
    api.notes
      .list(this.state.next)
      .then(response => {
        const { results, next } = response.data;
        this.setState({
          loading: false,
          data: results,
          next,
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
    const { detailModal, deleting, loading } = this.state;
    return (
      <Fragment>
        <CreateNew createdNew={this.createdNew} />
        <ListNotes
          data={this.state.data}
          onDelete={this.deleteNote}
          onClick={this.showDetail}
          deleting={deleting}
          loading={loading}
          hasMore={!!this.state.next}
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
