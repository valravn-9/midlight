import { TracksList } from '@/components/TracksList';
import { defaultStyles } from '@/styles';
import { ScrollView, View } from 'react-native';
import { screenPadding } from '@/constants/tokens';
import { useMemo } from 'react';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { useFavorites } from '@/store/library';
import { trackTitleFilter } from '@/helpers/filter';
import { generateTracksListId } from '@/helpers/miscellaneous';

const FavoritesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in songs',
    },
  });

  const favoritesTracks = useFavorites().favorites;

  const filteredFavoritesTracks = useMemo(() => {
    if (!search) return favoritesTracks;

    return favoritesTracks.filter(trackTitleFilter(search));
  }, [search, favoritesTracks]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TracksList
          id={generateTracksListId('favorites', search)}
          scrollEnabled={false}
          tracks={filteredFavoritesTracks}
        />
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
