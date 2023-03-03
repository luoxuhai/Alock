import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface SafeAreaScrollViewProps extends ScrollViewProps {
  safeAreaProps?: SafeAreaViewProps;
}

export function SafeAreaScrollView({
  children,
  safeAreaProps,
  ...scrollViewProps
}: SafeAreaScrollViewProps): JSX.Element {
  return (
    <SafeAreaView
      edges={['left', 'right']}
      {...safeAreaProps}
      style={[$defaultSafeAreaStyle, safeAreaProps?.style]}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic" {...scrollViewProps}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const $defaultSafeAreaStyle: ViewStyle = {
  flex: 1,
};
