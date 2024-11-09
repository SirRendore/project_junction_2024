import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Alert, Image, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function CameraScreen({navigation}) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef(null)

  const onCameraReady = () => {
    setIsCameraReady(true);
     };

  if (!permission) {
    // Camera permissions are still loading.
    return <View/>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>COMPANY needs to access your camera to scan.</Text>
        <Button onPress={requestPermission} title="Request Camera Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);

    // TODO: API call here, to retreive the data from the barcode serial number
    let machineData;

    navigation.navigate("EditScreen", {machineData})
    setScanned(false);
  };

  async function takePhoto() { 
    if (!isCameraReady) return;

    // Take a photo using the camera.
    console.log('Taking photo');
    const photo = await ref.current.takePictureAsync({quality:0});

    // TODO: API call here, to retreive the data from the photo
    let machineData;

    navigation.navigate('EditScreen', {machineData});
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}
                  onCameraReady={onCameraReady} 
                  facing={facing}
                  ref={ref}
                  barcodeScannerSettings={{
                    barcodeTypes: ["qr", "pdf417"],
                  }}
                  onBarcodeScanned={scanned? undefined : handleBarcodeScanned}
      >
        <View style={styles.buttonContainer}>

          <View style={styles.button} />

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
              {/* <Image 
                source={require('@/assets/images/penis-7695.png')}
                style={styles.logo}
              /> */}
              <Feather name="circle" size={80} color="white" />
          </TouchableOpacity>
        
          <TouchableOpacity style={[styles.button, styles.flipbutton]} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
        
        </View>

      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 15,
  },
  camera: {
    flex: 1,
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignContent : 'center',
    // borderWidth: 10,
    // borderColor: 'yellow'
    // margin: 64,
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: "center",
    padding: 15,
    // borderWidth: 5,
    // borderColor: 'yellow'
  },
  flipbutton:{
    paddingBottom: 35
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    height: 100,
    aspectRatio: 1,
  },
});
