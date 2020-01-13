import Reactotron from 'reactotron-react-native';

// 10.51.172.25
// 192.168.0.10

if (__DEV__) {
  const tron = Reactotron.configure({ host: '10.51.172.25' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
