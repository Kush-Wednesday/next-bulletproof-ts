import { render, within, screen } from "@utils/testUtils";
import { renderHook } from "@testing-library/react-hooks";
import Itunes from "../index";
import { useFetchSongQuery } from "@features/itunes/api/getSongs";

const mock = jest.fn();
interface UseFetchSongQueryType {
    data:string;
    error:boolean;
    isLoading:boolean;
    isFetching:boolean;

}

describe("<Itunes />", () => {
  it("should render and match the snapshot", () => {
    const { baseElement } = render(<Itunes />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should check if Child components are rendered", () => {
    render(<Itunes />);
    expect(screen.getByTestId("search-box")).not.toBeNull();
    expect(screen.getByTestId("track-list")).not.toBeNull();
  });

  it.skip("should call fetchBaseQuery hook",()=> {
    const songName = "test";

    // const usefetchSongQuerySpy = jest.fn((songName)=>({data: "test", error: false, isLoading: true, isFetching: true }));
   
   const {result}=renderHook(()=>useFetchSongQuery(songName));
   expect(result.current.isFetching).toEqual("true");
   const returnData:UseFetchSongQueryType={
    data: "test",
    error: false,
    isLoading: true,
    isFetching: true,
   }
  });
  
});
