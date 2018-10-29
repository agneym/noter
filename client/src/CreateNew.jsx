import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import PropTypes from "prop-types";

import api from "./api";
import { NOTIFICATION_MESSAGES } from "./constants";

const FormItem = Form.Item;
const { TextArea } = Input;

class CreateNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      loading: false,
    };
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  createNote = () => {
    this.setState({
      loading: true,
    });
    const { text, title } = this.state;
    api.notes
      .create(title, text)
      .then(response => {
        this.props.createdNew(response.data.result);
        message.success(NOTIFICATION_MESSAGES.noteAdded);
        this.setState({
          text: "",
          title: "",
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    return (
      <Form>
        <FormItem>
          <Input
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </FormItem>
        <FormItem>
          <TextArea
            name="text"
            autosize
            placeholder="Place note here"
            value={this.state.text}
            onChange={this.handleInputChange}
          />
        </FormItem>
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.createNote}
          disabled={this.state.loading}
        >
          Create
        </Button>
      </Form>
    );
  }
}

CreateNew.propTypes = {
  createdNew: PropTypes.func.isRequired,
};

export default CreateNew;
