import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { debounce } from "lodash";
import { Form, Input, Button } from "antd";

import api from "../../api";
import Header from "./Header";
import Footer from "./Footer";

const FormItem = Form.Item;
const { TextArea } = Input;

class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingInfo: false,
      noteData: {
        title: "",
        text: "",
      },
      editTime: null,
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

    this.setState(
      prevState => ({
        noteData: {
          ...prevState.noteData,
          [name]: value,
        },
        editTime: null,
      }),
      () => {
        this.editNote();
      }
    );
  };
  deleteNote = () => {
    const { id, deleteNote } = this.props;
    deleteNote(id);
  };
  editNote = debounce(() => {
    const {
      noteData: { title, text },
    } = this.state;
    api.notes.update(this.props.id, title, text).then(() => {
      this.setState({
        editTime: new Date(),
      });
    });
  }, 1000);
  render() {
    const { noteData } = this.state;
    return (
      <Fragment>
        <Header deleteNote={this.deleteNote} />
        <br />
        <Form>
          <FormItem label="Title">
            <Input
              value={noteData.title}
              name="title"
              onChange={this.handleInputChange}
            />
          </FormItem>
          <FormItem label="Text">
            <TextArea
              autosize
              value={noteData.text}
              name="text"
              onChange={this.handleInputChange}
            />
          </FormItem>
        </Form>
        <br />
        <Footer />
      </Fragment>
    );
  }
}

DetailModal.propTypes = {
  id: PropTypes.number.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default DetailModal;
