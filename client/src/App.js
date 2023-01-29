import { Admin, Resource, defaultTheme, CustomRoutes } from "react-admin";
import { AiOutlineMail, AiOutlineFileText } from "react-icons/ai";
import { Route } from "react-router-dom";
import dataProvider from "./providers/dataProvider";
import authProvider from "./providers/authProvider";

// Email Page
import EmailList from "./list/emails";
import EmailCreate from "./create/emails";
import EmailEdit from "./edit/emails";
// Template Page
import TemplateList from "./list/templates";
import TemplateCreate from "./create/templates";
import TemplateEdit from "./edit/templates";
// Mailer
import Mailer from "./mailer";
import MailerCreate from "./mailer/create";
import Layout from "./layout";

const theme = {
  ...defaultTheme,
  palette: {
    mode: "dark", // Switching the dark mode on is a single property value change.
  },
};

const App = () => {
  return (
    <Admin layout={Layout} theme={theme} dataProvider={dataProvider} authProvider={authProvider} requireAuth>
      <Resource name="emails" icon={AiOutlineMail} list={EmailList} create={EmailCreate} edit={EmailEdit} />
      <Resource name="templates" icon={AiOutlineFileText} list={TemplateList} create={TemplateCreate} edit={TemplateEdit} />
      <CustomRoutes>
        <Route path="/mailers" element={<Mailer />} />
        <Route path="/mailers/create" element={<MailerCreate />} />
      </CustomRoutes>
    </Admin>
  );
};

export default App;
