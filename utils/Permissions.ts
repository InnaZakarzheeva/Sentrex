import { Alert, Platform } from "react-native";
import {
  check,
  openSettings,
  request,
  Permission,
  PERMISSIONS,
  RESULTS
} from "react-native-permissions";

type PermissionType = "camera" | "photo_lib";

const getPermissionFromType = (permission: PermissionType): Permission => {
  switch (permission) {
    case "camera":
      return Platform.OS === "android"
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;
    case "photo_lib":
      return Platform.OS === "android"
        ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;
  }
};

const handlePermission = (
  permission: PermissionType,
  permissionGranted: () => void,
  permissionDeniedOrBlocked: () => void
) => {
  check(getPermissionFromType(permission))
    .then((checkResult) => {
      switch (checkResult) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            "Permission error",
            `Your device has no access to ${permission}`
          );
          break;
        case RESULTS.DENIED:
          request(getPermissionFromType(permission))
            .then((requestResult) => {
              console.log("result", requestResult);
              switch (requestResult) {
                case RESULTS.GRANTED:
                  permissionGranted();
                  break;
                case RESULTS.DENIED:
                  permissionDeniedOrBlocked();
                  break;
                case RESULTS.BLOCKED:
                  permissionDeniedOrBlocked();
                  break;
                case RESULTS.LIMITED:
                  permissionGranted();
                  break;
              }
            })
            .catch((err) => {
              console.log("Permission request error", err);
            });
          break;
        case RESULTS.GRANTED:
          permissionGranted();
          break;
        case RESULTS.LIMITED:
          permissionGranted();
          break;
        case RESULTS.BLOCKED:
          openSettings();
          break;
      }
    })
    .catch((err) => {
      console.log("Permission check error", err);
    });
};

export { handlePermission };