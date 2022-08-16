import { fireEvent, render, waitFor, within } from "@utils/testUtils";
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

  it("should contain 1 TrackList component", () => {
    const { getAllByTestId } = render(<TrackList {...trackListProps} />);
    expect(getAllByTestId("track-list").length).toBe(1);
  });

  it.skip("should contain correct image source", async () => {
    const { queryByTestId } = render(<TrackList {...trackListProps} />);
    const trackList = queryByTestId("track-list");
    const trackCard = within(trackList!).queryByTestId("track-card");
    const testImage = within(trackCard).queryByTestId("album-art") as HTMLImageElement;
    await waitFor(() => expect(testImage).toBeInTheDocument());
    // await waitFor(()=>expect(testImage.src).toContain("https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/5a/47/6d/5a476ddd-4690-1297-1896-6a286a497a21/191404113974.png/100x100bb.jpg"));
  });

  it.skip("should play audio element when clicked", async () => {
    const { queryByTestId } = await render(<TrackList {...trackListProps} />);
    const audioElement = queryByTestId("audio-test")!;
    const onPlay = jest.fn();
    fireEvent.click(audioElement);
    expect(onPlay).toHaveBeenCalledTimes(1);
  });
});
