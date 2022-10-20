import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Gallery from './gallery';
import CreateNFTDetails from './create_nft_details';
import CreateNFTTokenomics from './create_nft_tokenomics';
import ImageGallery from './image/image_gallery';
import VideoGallery from './video/video_gallery';

const Stack = createNativeStackNavigator();

const CreateNFT = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Gallery" component={Gallery} />
    <Stack.Screen name="ImageGallery" component={ImageGallery} />
    <Stack.Screen name="VideoGallery" component={VideoGallery} />
    <Stack.Screen name="CreateNFTDetails" component={CreateNFTDetails} />
    <Stack.Screen name="CreateNFTTokenomics" component={CreateNFTTokenomics} />
  </Stack.Navigator>
);

export default CreateNFT;
