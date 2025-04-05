import unknownArtistImage from '@/assets/unknown_artist.png';
import unknownAlbumImage from '@/assets/unknown_album.png';
import { Image } from 'react-native';

export const unknownTrackImageUri = Image.resolveAssetSource(unknownAlbumImage).uri;
export const unknownArtistImageUri = Image.resolveAssetSource(unknownArtistImage).uri;
