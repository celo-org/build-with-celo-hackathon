import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { getCategories } from '@services/categories';
import { useUpdateCurrentUserMutation } from '@features/current_user';
import { saveProfilePhoto } from '@services/user';
import { mintNFT } from '@services/nft';
import { useSmartContract } from '@hooks';
import {
  FavoriteCategories,
  InputField,
  Loading,
  ProfileImage,
  StatusBar,
} from '@library';
import CoverImage from './cover_image';
import ImageSection from './image_section';
import Header from './header';
import SocialMediaLinksField from './social_media_links_field';
import styles from './styles';

const EditProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const { getContractMethods } = useSmartContract();
  const [updateCurrentUser] = useUpdateCurrentUserMutation();

  const [profileFields, setProfileFields] = useState({
    ...route.params.profileData,
    socialMediaLinks: route?.params?.profileData?.socialMediaLinks || [],
  });
  const [allCategories, setAllCategories] = useState([]);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newCoverImage, setNewCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setAllCategories(await getCategories());
    })();
  }, []);

  useEffect(() => {
    if (route?.params?.nft?.resource) {
      if (route?.params?.type === 'profile') {
        setNewProfileImage({
          description: route.params.nft.description,
          image: route.params.nft.resource,
        });
      } else if (route?.params?.type === 'cover') {
        setNewCoverImage({
          description: route.params.nft.description,
          image: route.params.nft.resource,
        });
      }
    }
  }, [route]);

  const onSocialMediaLinksChange = (text, index) => {
    const newArray = Array.from(profileFields.socialMediaLinks);
    if (index === undefined) {
      newArray.push('');
    } else {
      newArray[index] = text;
    }
    setProfileFields({
      ...profileFields,
      socialMediaLinks: newArray,
    });
  };
  const removeSocialIndex = (index) => {
    const newArray = Array.from(profileFields.socialMediaLinks);
    newArray.splice(index, 1);
    setProfileFields({
      ...profileFields,
      socialMediaLinks: newArray,
    });
  };
  const setFieldValue = (field, value) => {
    setProfileFields((prevProfileFields) => ({
      ...prevProfileFields,
      [field]: value,
    }));
  };

  const onSavePress = async () => {
    setIsLoading(true);
    let { profileImage, coverImage } = profileFields;
    if (newProfileImage !== null) {
      profileImage = await saveProfilePhoto(
        newProfileImage.description,
        newProfileImage.image,
        getContractMethods,
        mintNFT,
        connector
      );
      if (!profileImage) {
        setIsLoading(false);
        Alert.alert('Error', 'Something went wrong. Please try again');
        return;
      }
      setNewProfileImage(null);
      setFieldValue('profileImage', profileImage);
    }
    if (newCoverImage !== null) {
      coverImage = await saveProfilePhoto(
        newCoverImage.description,
        newCoverImage.image,
        getContractMethods,
        mintNFT,
        connector
      );
      if (!coverImage) {
        setIsLoading(false);
        Alert.alert('Error', 'Something went wrong. Please try again');
        return;
      }
      setNewCoverImage(null);
      setFieldValue('coverImage', coverImage);
    }
    const response = await updateCurrentUser({
      name: profileFields.name,
      username: profileFields.username,
      email: profileFields.email,
      bio: profileFields.bio,
      profileImage,
      coverImage,
      socialMediaLinks: profileFields.socialMediaLinks,
      favoriteCategories: profileFields.favoriteCategories,
    });
    setIsLoading(false);
    Alert.alert(
      'Profile',
      response?.data
        ? 'Profile was successfully saved'
        : 'Something went wrong, please try again'
    );
  };

  const onCategorySelect = (id) => {
    setProfileFields((prevState) => {
      const favoriteCategories = Array.from(prevState.favoriteCategories);
      const idIndex = profileFields.favoriteCategories.indexOf(id);
      if (idIndex > -1) favoriteCategories.splice(idIndex, 1);
      else favoriteCategories.push(id);

      return {
        ...profileFields,
        favoriteCategories,
      };
    });
  };

  const onUploadPhotoPress = (type) => {
    navigation.navigate('CreateNFT', {
      screen: 'Gallery',
      params: {
        returnTo: 'editProfilePhoto',
        profilePhoto: true,
        type,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header onSavePress={onSavePress} />
      <Loading visible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.horizontalRow} />
        <View style={styles.padHor16}>
          <ImageSection
            title="Profile Image (NFT)"
            onUploadPhotoPress={() => onUploadPhotoPress('profile')}
            newImage={newProfileImage !== null}
            clearImage={() => setNewProfileImage(null)}
          >
            <ProfileImage
              profileImage={
                newProfileImage?.image || profileFields.profileImage
              }
              containerStyle={{
                ...styles.profileImageContainer,
                backgroundColor: profileFields.profileColor,
              }}
              imageStyle={styles.profileImage}
              avatarWidth={62}
              avatarHeight={62}
            />
          </ImageSection>
          <ImageSection
            title="Cover Image (NFT)"
            onUploadPhotoPress={() => onUploadPhotoPress('cover')}
            newImage={newCoverImage !== null}
            clearImage={() => setNewCoverImage(null)}
          >
            <CoverImage
              coverImage={newCoverImage?.image || profileFields.coverImage}
            />
          </ImageSection>
          <InputField
            labelName="Name"
            value={profileFields.name}
            onFieldChange={(value) => setFieldValue('name', value)}
            inputPlaceholder="Enter your name"
            containerStyle={styles.marginTop16}
          />
          <InputField
            labelName="Username"
            value={profileFields.username}
            onFieldChange={(value) => setFieldValue('username', value)}
            inputPlaceholder="Enter your username"
            containerStyle={styles.marginTop16}
          />
          <InputField
            labelName="Email"
            value={profileFields.email}
            onFieldChange={(value) => setFieldValue('email', value)}
            inputPlaceholder="Enter your email"
            containerStyle={styles.marginTop16}
          />
          <InputField
            labelName="Bio"
            value={profileFields.bio}
            onFieldChange={(value) => setFieldValue('bio', value)}
            inputPlaceholder="Enter your bio"
            multiline
            numberOfLines={Platform.OS === 'ios' ? null : 6}
            minHeight={Platform.OS === 'ios' ? 120 : null}
            inputStyle={{ paddingTop: 16 }}
            containerStyle={styles.marginTop16}
          />
          <SocialMediaLinksField
            socialMediaLinks={profileFields.socialMediaLinks}
            onSocialMediaLinksChange={onSocialMediaLinksChange}
            removeSocialIndex={removeSocialIndex}
          />
          <FavoriteCategories
            title
            allCategories={allCategories}
            userCategories={profileFields.favoriteCategories}
            onCategorySelect={onCategorySelect}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
