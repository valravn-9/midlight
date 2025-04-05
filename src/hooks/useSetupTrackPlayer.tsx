import { useEffect, useRef } from 'react';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10, // 10MB
  });

  await TrackPlayer.setVolume(0.03); // not too loud
  await TrackPlayer.setRepeatMode(RepeatMode.Queue); // repeat the queue
};

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        onLoad?.();
      })
      .catch((error) => {
        isInitialized.current = false;
        console.error('Error setting up TrackPlayer:', error);
      });
  }, [onLoad]);
};
