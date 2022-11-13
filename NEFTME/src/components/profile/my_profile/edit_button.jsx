import React from 'react';
import { ProfileDataDefaultProps, ProfileDataPropTypes } from '@utils/proptypes';
import { StyleSheet } from 'react-native';
import { Button } from '@library';
import PenIcon from '@assets/icons/pen.svg';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    marginLeft: 16,
  },
  buttonText: {
    marginLeft: 13,
    fontWeight: '500',
    fontSize: 16,
  },
  buttonIcon: {
    width: 14.53,
    height: 15.55,
  },
});

const EditButton = ({ profile }) => {
  const navigation = useNavigation();

  return (
    <Button
      primary={false}
      buttonStyle={styles.buttonStyle}
      onPress={() => navigation.navigate('EditProfile', { profileData: profile })}
      text="Edit Profile"
      textStyle={styles.buttonText}
      Icon={PenIcon}
      iconStyle={styles.buttonIcon}
    />
  );
};

EditButton.defaultProps = ProfileDataDefaultProps;
EditButton.propTypes = ProfileDataPropTypes;

export default EditButton;
