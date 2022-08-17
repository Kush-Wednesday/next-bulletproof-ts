import { render,screen } from "@utils/testUtils";
import { SongPage } from "..";

describe("<SongPage />",()=>{
    it("should render and match the snapshot", () => {
        const { baseElement } = render(<SongPage />);
    
        expect(baseElement).toMatchSnapshot();
      });

      it("should check if child component rendered",()=>{
            render(<SongPage />);
            expect(screen.getByTestId("search-box")).not.toBeNull();
      });
})