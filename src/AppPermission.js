import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const PLATFORM_MICROPHONE_PERMISSIONS = {
  ios: PERMISSIONS.IOS.MICROPHONE   ,
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS  ,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};

const REQUEST_PERMISSION_TYPE = {
  microphone: PLATFORM_MICROPHONE_PERMISSIONS,
  location: PLATFORM_MICROPHONE_PERMISSIONS,
};

const PERMISSION_TYPE = {
  microphone: 'microphone',
  location: 'location',
};

class AppPermission {
  checkPermission = async (type): Promise<boolean> => {
    console.log('AppPermission checkPermission type : ', type);
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    console.log('AppPermission checkPermission permission : ', permissions);
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      console.log('AppPermission checkPermission result : ', result);
      if ((result = RESULTS.GRANTED)) return true;
      return this.requestPermission(permissions);
    } catch (error) {
      console.log('AppPermission checkPermission errr : ', error);
      return false;
    }
  };

  requestPermission = async (permissions): Promise<boolean> => {
    console.log('AppPermission checkPermission permissions : ', permissions);
    try {
      const result = await request(permissions);
      console.log('AppPermission checkPermission result : ', result);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('AppPermission checkPermission errr : ', error);
      return false;
    }
  };
}

const Permisson = new AppPermission();
export {Permisson, PERMISSION_TYPE};
