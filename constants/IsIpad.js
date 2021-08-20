import { Platform } from 'react-native';

export const IsIpad = Platform.OS === 'ios' && Platform.isPad;
