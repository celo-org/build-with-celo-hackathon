import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Gallery from './gallery';
import CreateNFTDetails from './create_nft_details';
import CreateNFTTokenomics from './create_nft_tokenomics';
import ImageGallery from './image/image_gallery';
import VideoGallery from './video/video_gallery';
import EditImage from './image/edit_image';
import EditVideo from './video/edit_video';
import LocationNFT from './location/location';

const Stack = createNativeStackNavigator();

const CreateNFT = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Gallery" component={Gallery} />
    <Stack.Screen name="ImageGallery" component={ImageGallery} />
    <Stack.Screen name="EditImage" component={EditImage} />
    <Stack.Screen name="EditVideo" component={EditVideo} />
    <Stack.Screen name="VideoGallery" component={VideoGallery} />
    <Stack.Screen name="CreateNFTDetails" component={CreateNFTDetails} />
    <Stack.Screen name="LocationNFT" component={LocationNFT} />
    <Stack.Screen name="CreateNFTTokenomics" component={CreateNFTTokenomics} />
  </Stack.Navigator>
);

export default CreateNFT;
