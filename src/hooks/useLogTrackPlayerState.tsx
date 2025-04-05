import { Event, useTrackPlayerEvents } from 'react-native-track-player';

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged];

export const useLogTrackPlayerState = () => {
  useTrackPlayerEvents(events, async (event) => {
    if (event.type === Event.PlaybackError) {
      console.error('TrackPlayer Error:', event);
    }

    if (event.type === Event.PlaybackState) {
      console.log('Playback State Changed:', event.state);
    }

    if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log('Active Track Changed:', event.index);
    }
  });
};
