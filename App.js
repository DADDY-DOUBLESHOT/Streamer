import React, { useEffect } from "react";
import { Component } from "react";
import { View,Text,StyleSheet,TouchableOpacity,Button, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LottieView from "lottie-react-native";
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useState } from "react";
import { updateId } from "expo-updates";



function Home()
{
        const [status,setStatus]=useState({});
        const [filepath,setPath]=useState(null);
        const [width,setWidth]=useState(0);
        const [height,setHeight]=useState(0);
        const [isSelected,setSelect]=useState(false);
        const [filename,setName]=useState({});
        const video = React.useRef(null);
       
        async function VideoSelector()
        {
          let result=await ImagePicker.launchImageLibraryAsync(
              {
                    mediaTypes:ImagePicker.MediaTypeOptions.Videos,
                    aspect:[4,2],
                    quality:1,
              }
          );

        
            if(!result.cancelled)
            {
                setPath(result.uri);
                setWidth(result.width);
                setHeight(result.height);
                setName(result.uri.substring(result.uri.lastIndexOf('/')+1,result.uri.length));
            }
            setSelect(true);
         
        
        }
        function Screen1()
        {
            return(
                <View style={{flex:1}}>
                    <View style={{flex:1,justifyContent:"center",margin:20}}>
                        <Text style={{fontSize:17,color:"grey",opacity:0.7,alignSelf:"center"}}>
                            Select a Video File to Stream
                        </Text>
                    </View>
                    <View style={{flex:2,margin:30}}>
                        <TouchableOpacity style={{flex:1}} onPress={()=>{VideoSelector()}}>
                            <LottieView style={{flex:1,marginBottom:50}} source={require('./assets/animated/bg/file3.json')} autoPlay/>
                        </TouchableOpacity>

                    </View>
                    
                </View>
            );
        }
        function Screen2()
        {
          
            return (
                <View style={{flex:1,justifyContent:"center" 
                }}>
                    <View style={{flex:1,justifyContent:"space-around"}}>
                        <Video
                        style={{flex:1,justifyContent:"center"}}
                        ref={video}
                        source={{uri:filepath}}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                    </View>
                    <View style={{flex:1}}>
                       
                    </View>
                </View>
            );
        }
        
        if(isSelected)
        {
            return Screen2();
        }
        else
        {
            return Screen1();
        }
         
}

function Current_Stream()
{
   
        return(
            <View>
                <Text style={{fontSize:50}}>
                  Currently Streaming
                </Text>
            </View>
        )
    
}







const Tabs=createBottomTabNavigator();
class App extends Component
{
    render()
    {
        return(
            <NavigationContainer>
                <Tabs.Navigator>
                    <Tabs.Screen name="Home" component={Home}  options={{
                        tabBarIcon: ({ focused, color, size }) => {
                            
                            return <LottieView source={require('./assets/animated/Home.json')} autoPlay={focused}/>
                           
                            }
                    }}/>
                    <Tabs.Screen name="Currently Streaming" component={Current_Stream} options={{
                        tabBarIcon: ({ focused, color, size }) => {
                           
                            return <LottieView source={require('./assets/animated/Stream.json')} autoPlay={focused}/>
                            
                            }
                    }}/>
                </Tabs.Navigator>
            </NavigationContainer>
        );
    }
}
export default App;