import { Input } from "antd";
import { CustomSearchStyle, Heading } from "@features/itunes/components/styled";
import { injectIntl, IntlShape } from "react-intl";
import { debounce } from "lodash";

export interface CustomSearchProps {
  intl: IntlShape;
  handlechange: (searchText: string) => void;
}

const { Search } = Input;

const CustomSearch = ({ intl, handlechange }: CustomSearchProps) => {
  const debouncedHandler = debounce(handlechange, 100);
  return (
    <CustomSearchStyle data-testid="search-box" title={intl.formatMessage({ id: "search_song" })}>
      <Search
        data-testid="search-input"
        type="text"
        placeholder="Type here..."
        onChange={evt => handlechange(evt.target.value)}
        onSearch={searchText => handlechange(searchText)}
      />
    </CustomSearchStyle>
  );
};

export default injectIntl(CustomSearch);
