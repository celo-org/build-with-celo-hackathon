/* eslint-disable max-len */
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import FacebookIcon from '@assets/icons/facebook.svg';
import InstagramIcon from '@assets/icons/instagram.svg';
import TwitterIcon from '@assets/icons/twitter.svg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  marginLeft8: {
    marginLeft: 8,
  },
});

const getLink = (links, socialNetwork) => links.find((l) => l.indexOf(socialNetwork) >= 0);

const SocialLinks = ({ socialMediaLinks }) => {
  if (!socialMediaLinks) return null;

  const facebookLink = getLink(socialMediaLinks, 'facebook');
  const instagramLink = getLink(socialMediaLinks, 'instagram');
  const twitterLink = getLink(socialMediaLinks, 'twitter');
  return (
    <View style={styles.container}>
      {facebookLink ? <FacebookIcon width={20} height={20} onPress={() => Linking.openURL(facebookLink)} /> : null}
      {instagramLink ? <InstagramIcon width={20} height={20} style={styles.marginLeft8} onPress={() => Linking.openURL(instagramLink)} /> : null}
      {twitterLink ? <TwitterIcon width={20} height={20} style={styles.marginLeft8} onPress={() => Linking.openURL(twitterLink)} /> : null}
    </View>
  );
};

SocialLinks.propTypes = {
  socialMediaLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SocialLinks;
