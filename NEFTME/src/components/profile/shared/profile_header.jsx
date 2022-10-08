import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pressable, StyleSheet, View,
} from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import Burger from '@assets/icons/burger.svg';
import { CoverImage } from '@library';
import SettingsModal from './settings_modal';

const styles = StyleSheet.create({
  coverImageWrapper: {
    width: '100%',
    height: 235,
  },
  coverImage: {
    width: '100%',
    height: 235,
  },
  coverImageGradient: {
    height: '100%',
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 60,
  },
  settingsBar: {
    position: 'absolute',
    left: 300,
    top: 45,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  modalView: {
    position: 'absolute',
    width: 198,
    height: 180,
    left: 55,
    top: -5,
    marginTop: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 100,
    backgroundColor: '#2C2C39',
    justifyContent: 'center',
  },
  touchableOpacityStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  individualSettingView: {
    flexDirection: 'row',
    padding: 10,
  },
  settingsFont: {
    paddingLeft: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: 16,
  },
});

const ProfileHeader = ({
  coverImage, profileColor, goBack, isCurrentUser,
}) => {
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);

  return (
    <View>
      <CoverImage
        coverImage={coverImage}
        coverImageWrapperStyle={styles.coverImageWrapper}
        coverImageStyle={styles.coverImage}
        coverGradientStyle={styles.coverImageGradient}
        profileColor={profileColor}
        bottomCoverColor="#141316"
      />
      <SettingsModal
        isCurrentUser={isCurrentUser}
        isSettingsModalVisible={isSettingsModalVisible}
        setSettingsModalVisible={setSettingsModalVisible}
      />
      <Pressable style={styles.backIcon} onPress={goBack}>
        <BackIcon width={30} height={30} />
      </Pressable>
      {isCurrentUser && (
        <Pressable
          style={styles.settingsBar}
          onPress={
            () => setSettingsModalVisible((prevValue) => !prevValue)
          }
        >
          <Burger width={70} height={70} />
        </Pressable>
      )}
    </View>
  );
};

ProfileHeader.defaultProps = {
  coverImage: '',
};

ProfileHeader.propTypes = {
  coverImage: PropTypes.string,
  profileColor: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
};

export default ProfileHeader;
