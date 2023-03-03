import {
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
  Text,
  PlatformColor,
  StyleSheet,
} from 'react-native';
import { human } from 'react-native-typography';

interface ListSectionProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  headerText?: string;
  footerText?: string;
}

export function ListSection(props: ListSectionProps) {
  return (
    <View style={[$container, props.style]}>
      {props.headerText && (
        <Text style={[$title, { color: PlatformColor('secondaryLabel') }]}>{props.headerText}</Text>
      )}
      <View style={$content}>{props.children}</View>
      {props.footerText && (
        <Text style={[$description, { color: PlatformColor('secondaryLabel') }]}>
          {props.footerText}
        </Text>
      )}
    </View>
  );
}

const $container: ViewStyle = {
  marginVertical: 12,
};

const $content: ViewStyle = {
  borderRadius: 10,
  overflow: 'hidden',
};

const $title: TextStyle = {
  ...StyleSheet.flatten(human.footnote),
  marginHorizontal: 16,
  marginBottom: 10,
};

const $description: TextStyle = {
  ...StyleSheet.flatten(human.caption1),
  marginHorizontal: $title.marginHorizontal,
  marginTop: $title.marginBottom,
};
