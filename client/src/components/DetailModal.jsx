import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import api from "../api";

const Header = styled.div`
  float: right;
`;

const { TextArea } = Input;

class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingInfo: false,
      editEnabled: false,
      noteData: {
        title: "",
        text: "",
      },
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    const { id } = this.props;
    this.setState({
      loadingInfo: true,
    });
    api.notes
      .getOne(id)
      .then(response => {
        this.setState({
          noteData: response.data.result,
        });
      })
      .finally(() => {
        this.setState({
          loadingInfo: false,
        });
      });
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      noteData: {
        ...prevState.noteData,
        [name]: value,
      },
    }));
  };
  enableEdit = () => {
    this.setState({
      editEnabled: true,
    });
  };
  deleteNote = () => {
    const { id, deleteNote } = this.props;
    deleteNote(id);
  };
  render() {
    const { editEnabled, noteData } = this.state;
    return (
      <Fragment>
        <Header>
          {!editEnabled && (
            <Button type="primary" icon="edit" onClick={this.enableEdit}>
              Edit
            </Button>
          )}
          <Button type="danger" ghost icon="delete" onClick={this.deleteNote}>
            Delete
          </Button>
        </Header>
        <Form>
          <Input
            readOnly={!editEnabled}
            value={noteData.title}
            name="title"
            onChange={this.handleInputChange}
          />
          <TextArea
            autosize
            readOnly={!editEnabled}
            value={noteData.text}
            name="text"
            onChange={this.handleInputChange}
          />
        </Form>
      </Fragment>
    );
  }
}

DetailModal.propTypes = {
  id: PropTypes.number.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default DetailModal;
