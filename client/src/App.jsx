import React, { Component } from "react";
import { Layout } from "antd";

import AppContent from "./Content";
import {
  StyledHeader,
  StyledSider,
  ContentLayout,
  StyledContent,
} from "./components/LayoutComponents";

const { Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }
  render() {
    return (
      <Layout>
        <StyledHeader>Header</StyledHeader>
        <Layout>
          <StyledSider>
            <p>Sider</p>
          </StyledSider>
          <ContentLayout>
            <StyledContent>
              <AppContent />
            </StyledContent>
            <Footer>Footer</Footer>
          </ContentLayout>
        </Layout>
      </Layout>
    );
  }
}
export default App;
