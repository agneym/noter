import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { Form, Input } from "antd";

import api from "../../api";
import Header from "./Header";
import Footer from "./Footer";
import Versions from "./Versions";

const FormItem = Form.Item;
const { TextArea } = Input;

class DetailModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadingInfo: false,
      noteData: {
        title: "",
        text: "",
      },
      versions: [],
      editTime: null,
    };
  }
  componentDidMount() {
    this.loadData();
    this.loadVersions();
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
  loadVersions = () => {
    const { id } = this.props;
    api.notes.listVersions(id).then(response => {
      this.setState({
        versions: response.data.result,
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
    this.updateNote(title, text);
  }, 1000);
  restoreFn = item => {
    const { title, text } = item;
    this.updateNote(title, text);
    this.setState(prevState => ({
      noteData: {
        ...prevState.noteData,
        title,
        text,
      },
    }));
  };
  updateNote = (title, text) => {
    api.notes.update(this.props.id, title, text).then(() => {
      this.setState({
        editTime: new Date(),
      });
    });
  };
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
              autoFocus
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
        <Versions data={this.state.versions} restoreFn={this.restoreFn} />
        <Footer time={this.state.editTime} closeModal={this.props.closeModal} />
      </Fragment>
    );
  }
}

DetailModal.defaultProps = {
  id: null,
};

DetailModal.propTypes = {
  id: PropTypes.number,
  deleteNote: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default DetailModal;
