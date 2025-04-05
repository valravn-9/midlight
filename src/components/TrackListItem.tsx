import { unknownTrackImageUri } from '@/constants/images';
import { TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';

export type TrackListItemProps = {
  track: {
    title: string;
    image?: string;
  };
};

export const TrackListItem = ({ track }: TrackListItemProps) => {
  return (
    <TouchableHighlight>
      <View>
        <FastImage
          source={{
            uri: track.image ?? unknownTrackImageUri,
            priority: FastImage.priority.normal,
          }}
        />
      </View>
    </TouchableHighlight>
  );
};
