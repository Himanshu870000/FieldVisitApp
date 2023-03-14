// import React, { useState } from 'react';
// import { View, Image, StyleSheet } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import { SvgUri } from 'react-native-svg';

// const countries = [
//   { label: 'Afghanistan (+93)', value: 'AF', logo: require('./assets/flags/af.svg') },
//   { label: 'Albania (+355)', value: 'AL', logo: require('./assets/flags/al.svg') },
//   // Add more countries here...
// ];

// const CountryPicker = ({ onChange }) => {
//   const [selectedValue, setSelectedValue] = useState('');

//   return (
//     <View style={styles.container}>
//       <RNPickerSelect
//         onValueChange={(value) => {
//           setSelectedValue(value);
//           onChange(value);
//         }}
//         placeholder={{ label: 'Select a country', value: null }}
//         items={countries.map((country) => ({ label: country.label, value: country.value }))}
//         value={selectedValue}
//         style={{ ...pickerSelectStyles }}
//       />
//       {selectedValue ? (
//         <View style={styles.logoContainer}>
//           <SvgUri width={30} height={20} uri={countries.find((c) => c.value === selectedValue).logo} />
//         </View>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderColor: '#ccc',
//   },
//   logoContainer: {
//     marginLeft: 'auto',
//     alignItems: 'center',
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 0.5,
//     borderColor: 'purple',
//     borderRadius: 8,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
// });

// export default CountryPicker;
