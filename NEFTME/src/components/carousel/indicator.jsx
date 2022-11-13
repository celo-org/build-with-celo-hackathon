import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, View } from 'react-native';
import styles from './styles';

const Indicator = ({
  data,
  currentIndex,
  setCurrentIndex,
}) => (
  <View style={styles.indicatorView}>
    {data.map((value, index) => value.image && (
      <Pressable
        key={value.id}
        style={
          index === currentIndex
            ? styles.activeIndicatorStyle
            : styles.inActiveIndicatorStyle
        }
        onPress={() => setCurrentIndex(index)}
      />
    ))}
  </View>
);

Indicator.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.number,
  })).isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
};

export default Indicator;
