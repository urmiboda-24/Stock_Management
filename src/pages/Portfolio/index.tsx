import { Add, Search, Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  FormLabel,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import CommonTextField from "../../component/customTextField";
import { useState } from "react";
import FormDialog from "./form";

const Portfolio = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const handleSearchChange = (searchValue: string) => {
    setSearchValue(searchValue);
    // setPage(1);
  };
  const handleByeStock = () => {
    setFormOpen(true);
  };

  const handleFormDialogClose = () => {
    setFormOpen(false);
  };
  const onFormDialogSave = () => {
    setFormOpen(false);
    // fetchData();
  };
  return (
    <>
      <NewTaskBox>
        <TransactionTitle>Portfolio</TransactionTitle>
        <ShareExportBox>
          <NewTaskButton startIcon={<Add />} onClick={handleByeStock}>
            Buy Stock
          </NewTaskButton>
        </ShareExportBox>
      </NewTaskBox>
      <FormDialog
        open={formOpen}
        onClose={handleFormDialogClose}
        onSave={onFormDialogSave}
      />
      <SearchWrapper>
        <CommonTextField
          value={searchValue}
          placeholder="Search"
          customStyle={{ maxWidth: "520px", width: "100%", marginBottom: 0 }}
          startIcon={<Search />}
          onChange={(event) => handleSearchChange(event.target.value)}
        />
      </SearchWrapper>
    </>
  );
};

export default Portfolio;

const NewTaskBox = styled(Box)({
  margin: "20px 0px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
});

const ShareExportBox = styled(Box)({
  border: "1px solid #262b40",
  borderRadius: "10px",
  height: "31px",
  "& .export-btn": {
    borderLeft: "1px solid #262b40",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  "& .share-btn": {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
});

const TransactionTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 400,
});

const SearchWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const NewTaskButton = styled(Button)({
  backgroundColor: "#262b40",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  height: "31px",
  borderRadius: "5px",
});
