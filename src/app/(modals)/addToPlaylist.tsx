import { PlaylistsList } from '@/components/PlaylistsList';
import { Playlist } from '@/helpers/types';
import { usePlaylists, useTracks } from '@/store/library';
import { useQueue } from '@/store/queue';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';

const AddToPlaylistModal = () => {
  const router = useRouter();

  const { activeQueueId } = useQueue();

  const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>();

  const tracks = useTracks();

  const { playlists, addToPlaylist } = usePlaylists();

  const track = tracks.find((currentTrack) => currentTrack.url === trackUrl);

  if (!track) return null;

  const availablePlaylists = playlists.filter((playlist) =>
    playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url),
  );

  const handlePlaylistPress = async (playlist: Playlist) => {
    addToPlaylist(track, playlist.name);

    router.dismiss();

    if (activeQueueId?.startsWith(playlist.name)) {
      await TrackPlayer.add(track);
    }
  };

  return (
    <SafeAreaView>
      <PlaylistsList playlists={availablePlaylists} onPlaylistPress={handlePlaylistPress} />
    </SafeAreaView>
  );
};

export default AddToPlaylistModal;
