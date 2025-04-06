import { PlaylistListItem } from '@/components/PlaylistListItem';
import { unknownTrackImageUri } from '@/constants/images';
import { playlistNameFilter } from '@/helpers/filter';
import { Playlist } from '@/helpers/types';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { utilsStyles } from '@/styles';
import { useMemo } from 'react';
import { FlatList, FlatListProps, Image, Text, View } from 'react-native';

type PlaylistsListProps = {
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
} & Partial<FlatListProps<Playlist>>;

const ItemDivider = () => (
  <View style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
);

export const PlaylistsList = ({
  playlists,
  onPlaylistPress: handlePlaylistPress,
  ...flatListProps
}: PlaylistsListProps) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in playlist',
    },
  });

  const filteredPlaylist = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, [playlists, search]);

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No playlist found</Text>

          <Image source={{ uri: unknownTrackImageUri }} style={utilsStyles.emptyContentImage} />
        </View>
      }
      data={filteredPlaylist}
      renderItem={({ item: playlist }) => (
        <PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
      )}
      {...flatListProps}
    />
  );
};
