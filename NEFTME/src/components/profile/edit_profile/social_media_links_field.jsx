/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';
import CloseIcon from '@assets/icons/close_input.svg';
import { CustomTextInput } from '@library';

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  addUrlButton: {
    borderRadius: 8,
    flex: 1,
    backgroundColor: 'rgba(65, 65, 74, 0.4)',
    marginTop: 16,
    padding: 16,
  },
  addUrlButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 22,
    right: 10,
    width: 24,
    height: 24,
  },
});

const SocialMediaLinksField = ({
  socialMediaLinks, onSocialMediaLinksChange, removeSocialIndex,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>Social media links</Text>
    {socialMediaLinks.map((s, index) => (
      <View key={`social_media_links_${index}`}>
        <CustomTextInput
          value={s}
          onChangeText={(text) => onSocialMediaLinksChange(text, index)}
          inputPlaceholder="Enter your social media link"
          keyboardType="default"
        />
        <CloseIcon style={styles.closeIcon} onPress={() => removeSocialIndex(index)} />
      </View>
    ))}
    <Pressable style={styles.addUrlButton} onPress={() => onSocialMediaLinksChange('', undefined)}>
      <Text style={styles.addUrlButtonText}>
        Add URL
      </Text>
    </Pressable>
  </View>
);

SocialMediaLinksField.propTypes = {
  socialMediaLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSocialMediaLinksChange: PropTypes.func.isRequired,
  removeSocialIndex: PropTypes.func.isRequired,
};

export default SocialMediaLinksField;
