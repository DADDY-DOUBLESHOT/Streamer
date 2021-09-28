import React, { useEffect } from "react";
import { Component } from "react";
import { View,Text,StyleSheet,TouchableOpacity,Button, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LottieView from "lottie-react-native";
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";




function Home()
{
        const [status,setStatus]=useState({});
        const [filepath,setPath]=useState(null);
        const [width,setWidth]=useState(0);
        const [height,setHeight]=useState(0);
        const [isSelected,setSelect]=useState(false);
        const [filename,setName]=useState({});
        const video = React.useRef(null);
        const play=React.useRef(null);
        const [playIcon,setPlay]=useState(require('./assets/animated/icons/play1.json'));
        const [stopped,setStop]=useState(true);
        const [isStream,Stream]=useState(false);
       
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
                setSelect(true);
            }
            else
            {
                setSelect(false);
            }
           
         
        
        }
        
        function toggleVideo()
        {
            if(stopped)
            {
                play.current.play();
                video.current.playAsync();
                play.current.play(125,160)
            }
            else
            {
                play.current.reset();
                video.current.pauseAsync();
            }
            
            
            setStop(!stopped);   
        }
        function Screen1()
        {
            return(
                <View style={{flex:1}}>
                    <StatusBar hidden/>
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
                <View style={{flex:1,justifyContent:"center"}}>
                    <LinearGradient style={{flex:1}} colors={["#f96153","#f96153"]} start={{x: 0, y: 0}} end={{x: 0, y: 0}} >
                    <View style={{flex:1,justifyContent:"center",overflow:"hidden",margin:20}}>
                        <Video
                        style={{flex:1,width:"90%",alignSelf:"center",borderRadius:30,overflow:"hidden"}}
                        ref={video}
                        source={{uri:filepath}}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                    </View>
                    <View style={{flex:0.8,backgroundColor:"#1a1a1a",borderRadius:30,display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                        <TouchableOpacity style={{flex:1,justifyContent:"space-evenly",flexDirection:"row"}} onPress={()=>{ toggleVideo()}} >
                             <LottieView  ref={play} source={playIcon}   />
                        </TouchableOpacity>
                       
                        
                    </View>
                    <View style={{flex:1}}></View>
                    </LinearGradient>
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



function Header1()
{
    return(
        <View style={{backgroundColor:"black",justifyContent:"center"}}>
            <Text style={{color:"white",fontSize:30,alignSelf:"center"}}>Select a Video</Text>
        </View>
    );
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
                        tabBarIcon: ({ focused }) => {
                            return <LottieView source={require('./assets/animated/Home.json')} autoPlay={focused}/>
                            },
                        header:props=><Header1{...props}/>
                            
                    }}/>
                    <Tabs.Screen name="Currently Streaming" component={Current_Stream} options={{
                        tabBarIcon: ({ focused}) => {
                           
                            return <LottieView  source={require('./assets/animated/Stream.json')} autoPlay={focused}/>

                            },
                            
                        
                    }}/>
                </Tabs.Navigator>
            </NavigationContainer>
        );
    }
}
export default App;