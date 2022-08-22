import { fireEvent, render } from "@utils/testUtils";
import EmptyResult from "../index";

describe("<EmptyResult />", () => {
  it("should match the snapshot", () => {
    const { baseElement } = render(<EmptyResult />);
    expect(baseElement).toMatchSnapshot();
  });
});
