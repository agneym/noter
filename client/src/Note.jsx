import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

function Note({ title, children }) {
  return (
    <Card title={title}>
      <p>{children}</p>
    </Card>
  );
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Note;
