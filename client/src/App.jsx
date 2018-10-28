import React, { Component } from "react";
import { Layout } from "antd";

import AppContent from "./Content";

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }
  render() {
    return (
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          Header
        </Header>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <p>Sider</p>
          </Sider>
          <Layout style={{ marginLeft: "200px" }}>
            <Content style={{ padding: "0 50px", marginTop: 64 }}>
              <AppContent />
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default App;
