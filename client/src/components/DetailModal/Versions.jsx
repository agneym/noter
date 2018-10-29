import React from "react";
import PropTypes from "prop-types";
import { Collapse, List, Button } from "antd";

const Panel = Collapse.Panel;

function Versions({ data, restoreFn }) {
  return (
    <Collapse bordered={false} defaultActiveKey={["1"]}>
      <Panel header="Version History">
        <List>
          {data.map(item => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => restoreFn(item)}>
                  Restore
                </Button>,
              ]}
            >
              <p>{new Date(item.archivedAt).toDateString()}</p>
            </List.Item>
          ))}
        </List>
      </Panel>
    </Collapse>
  );
}

Versions.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
      archivedAt: PropTypes.string,
    })
  ).isRequired,
  restoreFn: PropTypes.func.isRequired,
};

export default Versions;
