import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { format } from "date-fns";
import { Button } from "antd";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TimeContainer = styled.p`
  margin: 0 1rem;
  display: inline-block;
`;

function Footer({ time, closeModal }) {
  return (
    <Container>
      {time && (
        <TimeContainer>
          <span>Saved at </span>
          <time dateTime={time.toDateString()}>{format(time, "HH:mm")}</time>
        </TimeContainer>
      )}
      <Button type="default" onClick={closeModal}>
        Close
      </Button>
    </Container>
  );
}

Footer.defaultProps = {
  time: null,
};

Footer.propTypes = {
  time: PropTypes.instanceOf(Date),
  closeModal: PropTypes.func.isRequired,
};

export default Footer;
