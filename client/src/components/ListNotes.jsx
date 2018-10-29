import React, { Component } from "react";
import PropTypes from "prop-types";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";

import { StyledNote } from "../components/LayoutComponents";

/* eslint-disable */
class ListNotes extends Component {
  render() {
    const {
      data,
      loading,
      deleting,
      onClick,
      hasMore,
      onDelete,
      loadData,
    } = this.props;
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadData}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          grid={{ gutter: 16, lg: 4, md: 3, sm: 2 }}
          dataSource={data}
          renderItem={item => (
            <StyledNote
              key={item.id}
              title={item.title}
              loading={deleting}
              onClick={() => onClick(item.id)}
              onDelete={event => onDelete(event, item.id)}
            >
              {item.text}
            </StyledNote>
          )}
        />
      </InfiniteScroll>
    );
  }
}

ListNotes.defaultProps = {
  loading: false,
  deleting: false,
  hasMore: false,
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
  deleting: PropTypes.bool,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  loadData: PropTypes.func.isRequired,
};

export default ListNotes;
