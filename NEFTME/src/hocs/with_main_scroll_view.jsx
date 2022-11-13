import React from 'react';
import { BottomBar, StatusBar } from '@library';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';

const withMainScrollView = (showStatusBar, showBottomBar, backgroundColor = '#141316') => (WrappedComponent) => {
  const wrapped = (props) => (
    <>
      {showStatusBar && <StatusBar />}
      <ScrollView
        style={{ backgroundColor, marginBottom: showBottomBar ? 78 : 0 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <LinearGradient
          colors={['#303040', backgroundColor]}
          start={[0, 0]}
          end={{ x: 0, y: 0.1 }}
        >
          <WrappedComponent {...props} />
        </LinearGradient>
      </ScrollView>
      {showBottomBar && <BottomBar />}
    </>
  );

  return wrapped;
};

export default withMainScrollView;
