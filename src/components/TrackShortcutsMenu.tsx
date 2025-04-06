import { useFavorites } from '@/store/library';
import { useQueue } from '@/store/queue';
import { MenuView } from '@react-native-menu/menu';
import { useRouter } from 'expo-router';
import { PropsWithChildren } from 'react';
import TrackPlayer, { Track } from 'react-native-track-player';
import { match } from 'ts-pattern';

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>;

export const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
  const router = useRouter();

  const isFavorite = track.rating === 1;

  const { toggleTrackFavorite } = useFavorites();

  const { activeQueueId } = useQueue();

  const handlePressAction = (id: string) => {
    match(id)
      .with('add-to-favorites', async () => {
        toggleTrackFavorite(track);

        if (activeQueueId?.startsWith('favorites')) {
          await TrackPlayer.add([track]);
        }
      })
      .with('remove-from-favorites', async () => {
        toggleTrackFavorite(track);

        if (activeQueueId?.startsWith('favorites')) {
          const queue = await TrackPlayer.getQueue();

          const trackToRemove = queue.findIndex((queueTrack) => queueTrack.url === track.url);

          await TrackPlayer.remove(trackToRemove);
        }
      })
      .with('add-to-playlist', () => {
        router.push({
          // @ts-expect-error it works
          pathname: '(modals)/addToPlaylist',
          params: { trackUrl: track.url },
        });
      })
      .otherwise(() => {
        console.warn('Unknown action:', id);
      });
  };

  return (
    <MenuView
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      actions={[
        {
          id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
          title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
          image: isFavorite ? 'star.fill' : 'star',
        },
        { id: 'add-to-playlist', title: 'Add to playlist', image: 'plus' },
      ]}
    >
      {children}
    </MenuView>
  );
};
