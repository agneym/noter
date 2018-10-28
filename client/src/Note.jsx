import React from "react";
import PropTypes from "prop-types";
import { Card, List, Button } from "antd";

function Note({ title, children, loading, onDelete }) {
  return (
    <List.Item>
      <Card
        title={title}
        extra={
          <Button
            type="dashed"
            shape="circle"
            icon="delete"
            onClick={onDelete}
          />
        }
        loading={loading}
      >
        <p>{children}</p>
      </Card>
    </List.Item>
  );
}

Note.defaultProps = {
  loading: false,
};

Note.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
};

export default Note;
