import { Input } from "antd";
import { CustomSearchStyle } from "@features/itunes/components/styled";
import { injectIntl } from "react-intl";
import { debounce } from "lodash";

export interface CustomSearchProps {
  handlechange: (searchText: string) => void;
}

const { Search } = Input;

const CustomSearch = ({ handlechange }: CustomSearchProps) => {
  const debouncedHandler = debounce(handlechange, 100);
  return (
    <CustomSearchStyle data-testid="search-box">
      <h3>Search Your Song</h3>
      <Search
        type="text"
        placeholder="Type here..."
        onChange={evt => handlechange(evt.target.value)}
        onSearch={searchText => handlechange(searchText)}
      />
    </CustomSearchStyle>
  );
};

export default CustomSearch;
