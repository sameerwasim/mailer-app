import { Create, SimpleForm, required, TextInput } from "react-admin";

export const EmailCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="subject" validate={required()} fullWidth />
      <TextInput source="template" validate={required()} fullWidth multiline />
    </SimpleForm>
  </Create>
);

export default EmailCreate;
