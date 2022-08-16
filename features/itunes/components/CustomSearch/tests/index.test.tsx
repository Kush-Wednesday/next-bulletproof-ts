import { fireEvent, render } from "@utils/testUtils";

import CustomSearch from "../index";
const mock = jest.fn();
const handleChangeSpy = mock;

describe("<CustomSearch />", () => {
  it("should render and match the snapshot", () => {
    const { baseElement } = render(<CustomSearch handlechange={handleChangeSpy} />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should contain 1 search component", () => {
    const { getAllByTestId } = render(<CustomSearch handlechange={handleChangeSpy} />);

    expect(getAllByTestId("search-box").length).toBe(1);
  });

  it("onChange should be called when typed", () => {
    const searchedText = "better";
    const { getAllByTestId } = render(<CustomSearch handlechange={handleChangeSpy} />);
    const input = getAllByTestId("search-input")[0];
    fireEvent.change(input, { target: { value: searchedText } });
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it("handleChange should be called when searched", () => {
    const searchedText = "better";
    const { getAllByTestId } = render(<CustomSearch handlechange={handleChangeSpy} />);
    const input = getAllByTestId("search-input")[0];
    // fireEvent.change(input,{target:{value:searchedText}});
    fireEvent.click(input);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it("handleChange should be called 1 time  when double click", () => {
    const searchedText = "better";
    const { getAllByTestId } = render(<CustomSearch handlechange={handleChangeSpy} />);
    const input = getAllByTestId("search-input")[0];
    // fireEvent.change(input,{target:{value:searchedText}});
    fireEvent.dblClick(input);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });

  it("handleChange should  be called if empty string is searched", () => {
    const { getAllByTestId } = render(<CustomSearch handlechange={handleChangeSpy} />);
    const input = getAllByTestId("search-input")[0];
    expect(input).toBeInTheDocument();
    // fireEvent.change(input,{target:{value:""}});
    fireEvent.click(input);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });
});
