import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface Styles {
  header: ViewStyle;
  subHeaderRight: ViewStyle;
  subHeaderLeftContainer: ViewStyle;
  trendingTitle: TextStyle;
  seeAllText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  header: {
    flexDirection: 'row',
    marginRight: 18,
  },
  subHeaderRight: {
    flex: 0.75,
  },
  subHeaderLeftContainer: {
    flex: 0.25,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  trendingTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#B389FC',
    fontSize: 16,
    fontWeight: '500',
  },
});

type Props = {
  title: string;
  onSeeAllClick?: (event: GestureResponderEvent) => void;
  containerStyle?: Styles;
};

const SectionHeader: React.FC<Props> = ({
  title,
  onSeeAllClick = () => {},
  containerStyle = StyleSheet.create({}),
}) => (
  <View style={containerStyle}>
    <View style={styles.header}>
      <View style={styles.subHeaderRight}>
        <Text style={styles.trendingTitle}>{title}</Text>
      </View>
      <View style={styles.subHeaderLeftContainer}>
        {onSeeAllClick ? (
          <Pressable style={styles.seeAllText} onPress={onSeeAllClick}>
            <Text style={styles.seeAllText}>Refresh</Text>
          </Pressable>
        ) : (
          <Text style={styles.seeAllText}>See All</Text>
        )}
      </View>
    </View>
  </View>
);

export default SectionHeader;
