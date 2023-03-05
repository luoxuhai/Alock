import {
  StyleProp,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
  PlatformColor,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { SFSymbol } from 'react-native-sfsymbols';

export interface TextButtonProps extends TouchableOpacityProps {
  text?: TextProps['children'];
  textStyle?: StyleProp<TextStyle>;
  iconName?: string;
}

export const TextButton = observer<TextButtonProps>((props) => {
  const { text, textStyle, iconName, ...rest } = props;

  return (
    <TouchableOpacity style={[$container, props.style]} activeOpacity={0.5} {...rest}>
      {iconName && <SFSymbol name={iconName} style={$icon} />}
      <Text
        style={[{ color: PlatformColor('systemBlue') }, $textStyle, textStyle]}
        adjustsFontSizeToFit
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
});

const $container: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};

const $icon: ViewStyle = {
  width: 18,
  height: 18,
  marginRight: 5,
};

const $textStyle: TextStyle = {
  fontSize: 17,
  lineHeight: 22,
};
