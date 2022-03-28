import React, {useState} from "react";
import {Text, TextInput, View, Button, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc'





export default function Home() {

    const [bank, setBank] = useState(1000000)
    const [name, setName] = useState()
    const [price, setPrice] = useState(50)
    const [hour, setHour] = useState(0)
    const [day, setDay] = useState(1)

  


    return (<>
        <View style={tw.style('bg-blue-100 p-5 flex ')}>
        <Text style={tw.style('text-black text-7 mt-10 text-center')}>Day: {day}     Hour:{hour}</Text>
        <Text style={tw.style("text-center mt-2 text-10 bg-blue-500 text-black rounded-xl")}>Oilfield Game</Text>
        <Text style={tw.style('text-center mt-2 text-10 text-black')}>Bank: {`$${bank}`}</Text>
        <Text style={tw.style('text-center mt-2 text-10 text-black')}>Field Name: {name}</Text>
        <Text style={tw.style('text-center mt-2 text-8 text-black')}>Oil Price: {`$${price}`}/per bbl</Text>
       
        <StatusBar style="auto" />
      </View>

      <ImageBackground style={tw.style('h-[100%]')} source={require('../assets/oilbackground.jpg')}>
      <View>
      <Text>Hello</Text>
      </View>
      </ImageBackground></>
    )
}