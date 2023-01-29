import { useNavigate } from "react-router-dom";
import { List, Datagrid, TextField, DateField } from "react-admin";

const TemplateList = () => {
  const navigate = useNavigate();

  const edit = (id) => {
    navigate("/templates/" + id);
  };

  return (
    <List>
      <Datagrid rowClick={edit}>
        <TextField source="id" />
        <TextField source="subject" />
        <TextField source="template" />
        <DateField source="created" />
        <DateField source="updated" />
      </Datagrid>
    </List>
  );
};

export default TemplateList;
