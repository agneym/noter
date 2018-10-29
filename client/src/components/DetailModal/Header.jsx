import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "antd";

const StyledHeader = styled.div`
  float: right;
`;

function Header({ deleteNote }) {
  return (
    <StyledHeader>
      <Button type="danger" ghost icon="delete" onClick={deleteNote}>
        Delete
      </Button>
    </StyledHeader>
  );
}

Header.defaultProps = {
  deleteNote: () => {},
};

Header.propTypes = {
  deleteNote: PropTypes.func,
};

export default Header;
