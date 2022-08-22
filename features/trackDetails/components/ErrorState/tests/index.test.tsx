import { fireEvent, render } from "@utils/testUtils";
import ErrorState from "../index";

describe("<ErrorState />", () => {
  it("should match the snapshot", () => {
    const { baseElement } = render(<ErrorState />);
    expect(baseElement).toMatchSnapshot();
  });
});
