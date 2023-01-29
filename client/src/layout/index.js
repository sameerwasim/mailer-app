import { Layout, Menu } from "react-admin";
import { AiOutlineSend } from "react-icons/ai";

const MyMenu = () => (
  <Menu>
    <Menu.ResourceItem name="emails" />
    <Menu.ResourceItem name="templates" />
    <Menu.Item to="/mailers" primaryText="Mailers" leftIcon={<AiOutlineSend />} />
  </Menu>
);

const MyLayout = (props) => <Layout {...props} menu={MyMenu} />;

export default MyLayout;
