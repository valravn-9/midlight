import { colors } from './tokens';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerLargeTitle: true,
  headerLargeStyle: {
    backgroundColor: colors.background,
  },
  headerLargeTitleStyle: {
    color: colors.text,
  },
  headerTintColor: colors.text,
  headerTransparent: true,
  headerBlurEffect: 'prominent',
  headerShadowVisible: false,
};
