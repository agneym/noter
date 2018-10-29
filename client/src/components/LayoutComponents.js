import styled from "styled-components";
import { Layout } from "antd";

import Note from "../Note";

const { Header, Sider, Content } = Layout;

export const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
`;

export const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;

export const ContentLayout = styled(Layout)`
  margin-left: 200px;
`;

export const StyledContent = styled(Content)`
  padding: 0 50px;
  margin-top: 64px;
  min-height: calc(100vh - 64 * 2px);
`;

export const StyledNote = styled(Note)`
  cursor: pointer;
`;
