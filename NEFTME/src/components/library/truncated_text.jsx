import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

const TEXT_SIZE = 60;

const styles = StyleSheet.create({
  textStyle: {
    color: 'rgba(255, 255, 255, 0.71)',
    fontSize: 14,
    fontWeight: '400',
  },
  more: {
    color: '#feda79',
  },
});

const showMoreLabel = (text) => text.trim().length > TEXT_SIZE + 3;

const prepareText = (text) => (
  showMoreLabel(text) ? `${text.trim().slice(0, TEXT_SIZE)}...` : text.trim()
);

const TruncatedText = ({ text, textStyle }) => {
  const [showTruncatedText, setShowTruncatedText] = useState(showMoreLabel(text));
  return showTruncatedText ? (
    <Text style={[styles.textStyle, textStyle]}>
      {prepareText(text)}
      <Text style={styles.more} onPress={() => setShowTruncatedText(false)}> more</Text>
    </Text>
  ) : (
    <Text style={[styles.textStyle, textStyle]}>{text}</Text>
  );
};

TruncatedText.defaultProps = {
  textStyle: {},
};

TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.instanceOf(Object),
};

export default TruncatedText;
