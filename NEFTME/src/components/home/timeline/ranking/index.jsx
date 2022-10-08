import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { SectionHeader } from '@library';
import styles from './styles';
import RankingItem from './ranking_item';

const Ranking = ({ ranking }) => (
  <View style={styles.rankingContainer}>
    <SectionHeader title={ranking.label} containerStyle={styles.headerStyle} />
    {ranking.values.map((item) => (
      <RankingItem key={`ranking_item_${item.rank}`} item={item} />
    ))}
  </View>
);

Ranking.propTypes = {
  ranking: PropTypes.shape({
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

export default Ranking;
