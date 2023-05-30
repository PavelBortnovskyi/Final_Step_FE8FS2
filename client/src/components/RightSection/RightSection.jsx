import { SearchField } from "src/UI/SearchField";
import { SearchPeople } from "./SearchPeople";
import { Box } from "@mui/material";


export const RightSection = ({ isAuthenticated }) => {

  return (
    <Box sx={{
      margin: "16px"
    }}>
      <SearchField />
      <SearchPeople />
    </Box>
  )
};

