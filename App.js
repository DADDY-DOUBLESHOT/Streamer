import React from "react";
import { Component } from "react";
import { View,Text,StyleSheet,TouchableOpacity,Button, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LottieView from "lottie-react-native";
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useEffect } from "react";


class Home extends Component
{
    constructor()
    {
        super();
        this.state=
        {
           fileselected:false,
           filepath:null,
           filewidth:null,
           fileheight:null,

        }
    }
   
    render()
    {
        if(this.state.fileselected)
        {
            return (
                <View>
            <Text>
                Testing
            </Text>
        </View>
            );
           
        }
        else{
            return (
                <View style={{flex:1}}>
                    <Text style={{flex:1,alignSelf:"center",color:"grey",fontSize:18,margin:10}} >Select a Video File to Stream</Text>

                    <TouchableOpacity onPress={()=>{openImagePicker()}}>
                    <LottieView style={{alignSelf:"center" ,width:"80%",height:"80%"}}source={require('./assets/animated/bg/file3.json')} autoPlay />
                    </TouchableOpacity> 
                 </View>
            );
        }
    }
}

class Current_Stream extends Component
{
    render()
    {
        return(
            <View>
                <Text style={{fontSize:50}}>
                  Currently Streaming
                </Text>
            </View>
        );
    }
}

function watchPermissions()
{
    (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    })
}

const openImagePicker=async()=>
{
   
            const result= await ImagePicker.launchImageLibraryAsync(
                {
                    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                }
            )
        
           if(!result.cancelled)
           {
               return this.state={
                    filepath:result.uri,
                    fileheight:result.height,
                    filewidth:result.width,
                    fileselected:true,
               }
           }
     
    
    return Promise.resolve(undefined);
    
   
  
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