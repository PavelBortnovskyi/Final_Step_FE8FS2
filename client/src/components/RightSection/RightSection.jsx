import { SearchField } from "src/UI/SearchField";
import { InputSearch } from "../../UI/InputSearch/InputSearch";
import { TabPeople } from "../Messages/Search/TabPeople";
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
