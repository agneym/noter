import React from "react";
import PropTypes from "prop-types";
import { Card, List } from "antd";

function Note({ title, children }) {
  return (
    <List.Item>
      <Card title={title}>
        <p>{children}</p>
      </Card>
    </List.Item>
  );
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Note;
