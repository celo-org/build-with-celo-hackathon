import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, FavoriteCategories, Loading } from '@library';
import { getCategories } from '@services/categories';
import { useUpdateCurrentUserMutation } from '@features/current_user';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { withOnboardingView } from '@hocs';
import styles from './styles';

const Categories = () => {
  const navigation = useNavigation();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCurrentUser] = useUpdateCurrentUserMutation();

  useEffect(() => {
    (async () => { setAllCategories(await getCategories()); })();
  }, []);

  const onCategorySelect = (id) => {
    setSelectedCategories((prevState) => {
      const favoriteCategories = Array.from(prevState);
      const idIndex = selectedCategories.indexOf(id);
      if (idIndex > -1) favoriteCategories.splice(idIndex, 1);
      else favoriteCategories.push(id);

      return favoriteCategories;
    });
  };

  const onSavePress = async () => {
    setLoading(true);
    const response = await updateCurrentUser({
      favoriteCategories: selectedCategories,
    });
    setLoading(false);
    if (response) {
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{
          name: 'Start',
          params: { screen: 'ProfilePhoto' },
        }],
      }));
    } else {
      Alert.alert('Error', 'Something went wrong. Please try again');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.startTitle}>Pick your categories</Text>
      <Text style={styles.startSubTitle}>Help us find more relevant content to you.</Text>
      <FavoriteCategories
        title={false}
        allCategories={allCategories}
        userCategories={selectedCategories}
        onCategorySelect={onCategorySelect}
        listContainerStyle={styles.categoriesList}
      />
      <Button
        text="Save"
        buttonStyle={styles.saveButtonStyle}
        primary={selectedCategories.length > 0}
        onPress={selectedCategories.length > 0 ? onSavePress : () => { }}
      />
      {loading && <Loading />}
    </View>
  );
};

export default withOnboardingView(
  (navigation) => {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{
        name: 'Start',
        params: { screen: 'ProfilePhoto' },
      }],
    }));
  },
)(Categories);
