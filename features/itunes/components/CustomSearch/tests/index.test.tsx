import { render } from "@utils/testUtils";

import CustomSearch from "../index";
// import { CustomSearchProps } from "../index";

// jest.mock("../index");
const mock = jest.fn();
const handleChangeSpy = mock; /* as jest.MockedFunction<CustomSearchProps["handlechange"]>; */

describe("<CustomSearch />", () => {
  it("should render and match the snapshot", () => {
    const { baseElement } = render(<CustomSearch handlechange={handleChangeSpy} />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should contain 1 search component",()=>{
    const { getAllByTestId }=render(<CustomSearch handlechange={handleChangeSpy} />);

    expect(getAllByTestId("search-box").length).toBe(1);
  });
});
