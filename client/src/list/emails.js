import { useNavigate } from "react-router-dom";
import { List, Datagrid, TextField, DateField, TopToolbar, CreateButton, ExportButton } from "react-admin";
import { ImportButton } from "react-admin-import-csv";

const EmailList = (props) => {
  const navigate = useNavigate();

  const edit = (id) => {
    navigate("/emails/" + id);
  };

  const ListActions = (props) => {
    const { className } = props;
    const config = {
      logging: true,
      validateRow: async (row) => {
        if (row.id) {
          // throw new Error("AAAA");
        }
      },
      postCommitCallback: (reportItems) => {
        console.log("reportItems", { reportItems });
      },
      // disableImportNew: true,
      disableImportOverwrite: true,
    };
    return (
      <TopToolbar className={className}>
        <CreateButton />
        <ExportButton />
        <ImportButton {...props} {...config} parseConfig={{ dynamicTyping: true }} />
      </TopToolbar>
    );
  };

  return (
    <List {...props} actions={<ListActions />}>
      <Datagrid rowClick={edit}>
        <TextField source="id" />
        <TextField source="email" />
        <TextField source="group" />
        <DateField source="created" />
      </Datagrid>
    </List>
  );
};

export default EmailList;
