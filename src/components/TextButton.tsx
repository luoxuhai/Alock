import {
  StyleProp,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
  PlatformColor,
} from 'react-native';
import { observer } from 'mobx-react-lite';

export interface TextButtonProps extends TouchableOpacityProps {
  text?: TextProps['children'];
  textStyle?: StyleProp<TextStyle>;
}

export const TextButton = observer<TextButtonProps>((props) => {
  const { text, textStyle, ...rest } = props;

  return (
    <TouchableOpacity style={props.style} activeOpacity={0.5} {...rest}>
      <Text
        style={[{ color: PlatformColor('systemBlue') }, $textStyle, textStyle]}
        adjustsFontSizeToFit
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
});

const $textStyle: TextStyle = {
  fontSize: 17,
  lineHeight: 22,
};
