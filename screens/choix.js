// // import * as React from 'react';
// import { View, Text, Pressable, Image } from 'react-native'
// // import React from 'react';
// import React, { useState } from 'react';
// import { LinearGradient } from "expo-linear-gradient";
// import COLORS from '../constants/colors';
// import Button from '../components/Button';

// const Choix = ({ navigation }) => {   
//     const [isMarchandClicked, setIsMarchandClicked] = useState(false);
//     const [isClientClicked, setIsClientClicked] = useState(false);


//     return (
//         <LinearGradient
//         style={{ flex: 1 }}
//         colors={['#051347', '#051347']} // Utilisation de la couleur #09326c pour le dégradé linéaire
//     >
        
//            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             
//            {/* <Button
//                     title="Page Marchand"
//                    onPress={() => {
//                         setIsMarchandClicked(true);
//                         setIsClientClicked(false);
//                         navigation.navigate("Marchand");
//                     }}
//                     style={{
//                         width: "50%",
//                         marginBottom: 20,
//                         backgroundColor: isMarchandClicked ? COLORS.blue : COLORS.white,
//                     }}
//                 /> */}
//                 <Button
//                     title="cliquer pour scanner "
//                     onPress={() => {
//                         setIsClientClicked(true);
//                         setIsMarchandClicked(false);
//                         navigation.navigate("Client");
//                     }}
//                     style={{
//                         width: "50%",
//                         backgroundColor: isClientClicked ? COLORS.blue : COLORS.white,
    
//                     }}
//                 />
//                     </View>
//         </LinearGradient>
//     )
// }

// export default Choix;
// Marchand.js

import React from 'react';
import { View, Text } from 'react-native';

const Choix = () => {
  return (
    <View>
      <Text>Page Marchand</Text>
    </View>
  );
}

export default Choix;