import React, { Component } from "react";
import PropTypes from "prop-types";
import { List } from "antd";
import { StyledNote } from "../components/LayoutComponents";

/* eslint-disable */
class ListNotes extends Component {
  render() {
    const { data, loading, onClick, onDelete } = this.props;
    return (
      <List
        grid={{ gutter: 16, lg: 4, md: 3, sm: 2 }}
        dataSource={data}
        renderItem={item => (
          <StyledNote
            key={item.id}
            title={item.title}
            loading={loading}
            onClick={() => onClick(item.id)}
            onDelete={event => onDelete(event, item.id)}
          >
            {item.text}
          </StyledNote>
        )}
      />
    );
  }
}

ListNotes.defaultProps = {
  loading: false,
};

ListNotes.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default ListNotes;
