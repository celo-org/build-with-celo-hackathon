import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    width: '100%',
    height: STATUSBAR_HEIGHT,
  },
});

const CustomStatusBar = ({ backgroundColor, barStyle }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} barStyle={barStyle} />
    </SafeAreaView>
  </View>
);

CustomStatusBar.defaultProps = {
  backgroundColor: '#303040',
  barStyle: 'light-content',
};

CustomStatusBar.propTypes = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.string,
};

export default CustomStatusBar;
