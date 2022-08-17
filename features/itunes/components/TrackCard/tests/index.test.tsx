import { fireEvent, render } from "@utils/testUtils";
import TrackCard from "../index";

describe("<TrackCard />", () => {
  const trackCardProps = {
    result: {
      artistName: "Adele",
      trackName: "Hello",
      trackId: 1544494392,
      artistId: 262836961,
      trackTimeMillis: 295502,
      artworkUrl100:
        "https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/5a/47/6d/5a476ddd-4690-1297-1896-6a286a497a21/191404113974.png/100x100bb.jpg",
      previewUrl: "22233223",
    },
    memoizedAudioRef: {},
  };
  let trackEventSpy;
  beforeEach(() => {
    trackEventSpy = jest.fn();
  });

  it("should match the snapshot", () => {
    const { baseElement } = render(
      <TrackCard {...trackCardProps} trackEventHandler={trackEventSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it(" display dom for debug", () => {
    const { debug } = render(<TrackCard {...trackCardProps} trackEventHandler={trackEventSpy} />);
    debug();
  });

  it("should check if image is rendered", () => {
    const { getAllByTestId } = render(
      <TrackCard {...trackCardProps} trackEventHandler={trackEventSpy} />
    );
    const albumArt = getAllByTestId("album-art")[0] as HTMLImageElement;
    expect(albumArt.src).toContain(
      "https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/5a/47/6d/5a476ddd-4690-1297-1896-6a286a497a21/191404113974.png/100x100bb.jpg"
    );
  });

  it("should render audio element", async () => {
    const { getAllByTestId, debug } = await render(
      <TrackCard {...trackCardProps} trackEventHandler={trackEventSpy} />
    );
    const audioElement = getAllByTestId("audio-test")[0] as HTMLAudioElement;
    debug(audioElement);
    fireEvent.play(audioElement);
    expect(trackEventSpy).toBeCalled();
    expect(audioElement.id).toContain("22233223");
    expect(audioElement.controls).toBeTruthy();
  });
});
