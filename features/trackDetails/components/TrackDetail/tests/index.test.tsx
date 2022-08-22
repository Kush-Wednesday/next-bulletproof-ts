import { fireEvent, render } from "@utils/testUtils";
import TrackDetail from "../index";

describe("<TrackCard />", () => {
  const trackDetailProps = {
    trackDetails: {
      artistName: "Adele",
      trackName: "Hello",
      trackId: 1544494392,
      artworkUrl100:
        "https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/5a/47/6d/5a476ddd-4690-1297-1896-6a286a497a21/191404113974.png/100x100bb.jpg",
      previewUrl: "22233223",
      collectionName: "45",
      collectionPrice: 0.09,
      currency: "USD",
      releaseDate: "24 NOV 2018",
      trackPrice: 0.08,
    },
  };

  it("should match the snapshot", () => {
    const { baseElement } = render(<TrackDetail {...trackDetailProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("should contain 1 RepoList component", () => {
    const { getAllByTestId } = render(<TrackDetail {...trackDetailProps} />);
    expect(getAllByTestId("track-details").length).toBe(1);
  });

  it("should check if image is rendered", () => {
    const { getByAltText } = render(<TrackDetail {...trackDetailProps} />);
    const a = getByAltText(/no image/i) as HTMLImageElement;
    expect(a.src).toContain(
      "https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/5a/47/6d/5a476ddd-4690-1297-1896-6a286a497a21/191404113974.png/100x100bb.jpg"
    );
  });

  it("should render unavailable texts if props are undefined ", () => {
    const trackDetailProps1 = {
      trackDetails: {
        artistName: "Adele",
        trackName: "Hello",
        trackId: 1544494392,
        artworkUrl100:
          "https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/5a/47/6d/5a476ddd-4690-1297-1896-6a286a497a21/191404113974.png/100x100bb.jpg",
        previewUrl: "22233223",
        collectionName: "",
        collectionPrice: 0.09,
        currency: "USD",
        releaseDate: "24 NOV 2018",
        trackPrice: 0.08,
      },
    };
    const { getAllByTestId } = render(<TrackDetail {...trackDetailProps1} />);

    expect(getAllByTestId("artist-name")[0].innerHTML).toContain("Adele");
    expect(getAllByTestId("collection-name-unavailable").length).toBe(1);
    //   expect(getAllByTestId('collection-name')).toBeFalsy;
  });
});
