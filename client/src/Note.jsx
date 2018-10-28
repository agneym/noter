import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

function Note({ title, text }) {
  return (
    <Card title={title}>
      <p>{text}</p>
    </Card>
  );
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Note;
