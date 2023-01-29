import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const EmailEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" fullWidth />
      <TextInput source="subject" validate={required()} fullWidth />
      <TextInput source="template" validate={required()} fullWidth multiline />
    </SimpleForm>
  </Edit>
);

export default EmailEdit;
