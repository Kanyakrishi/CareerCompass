import {Stack} from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
// when the app is loading 
SplashScreen.preventAutoHideAsync();
const Layout = () => {
    const [fontsLoaded] = useFonts({
      DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
      DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
      DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    });

    // load the fonts 
    const onLayoutRootView = useCallback(async() => {
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])
    if(!fontsLoaded) return null;
    return <Stack/>
}

// need to show the home page only if the fonts are loaded  hence we use the SplashScreen


export default Layout;