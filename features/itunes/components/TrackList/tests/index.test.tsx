import { render } from "@utils/testUtils";
import TrackList from "../index";

describe("<TrackList />", () => {
  const trackListProps = {
    trackData: {
      resultCount: 1,
      results: [
        {
          artistName: "Adele",
          trackName: "Hello",
          trackId: 1544494392,
          artistId: 262836961,
          trackTimeMillis: 295502,
          artworkUrl100:
            "https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/5a/47/6d/5a476ddd-4690-1297-1896-6a286a497a21/191404113974.png/100x100bb.jpg",
          previewUrl: "22233223",
        },
      ],
    },
    loading: true,
    trackName: "test",
  };

  it("should render and match the snapshot", () => {
    const { baseElement } = render(<TrackList {...trackListProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  // it("should contain 1 TrackList component", () => {
  //   const { getAllByTestId } = render(<TrackList {...trackListProps} />);
  //   expect(getAllByTestId("track-list").length).toBe(1);
  // });
});
