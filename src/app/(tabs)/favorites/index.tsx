import { TracksList } from '@/components/TracksList';
import { defaultStyles } from '@/styles';
import { ScrollView, View } from 'react-native';
import library from '@/assets/data/library.json';
import { screenPadding } from '@/constants/tokens';
import { useMemo } from 'react';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';

const FavoritesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in songs',
    },
  });

  const favoritesTracks = useMemo(() => {
    return library.filter((track) => track.rating === 1);
  }, []);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TracksList scrollEnabled={false} tracks={favoritesTracks} />
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
