import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";

export default function Home() {
  const [bank, setBank] = useState(1000000);
  const [name, setName] = useState();
  const [oilPrice, setOilPrice] = useState(50);
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(1);
  const [gameStart, setGameStart] = useState(true)
    
  function getRandomOilPrice() {
    if(oilPrice > 20 && oilPrice < 150 ){
        let rdmNum = (Math.random() * (1.2 - .80) + .80) 
    console.log(rdmNum.toFixed(2))
    return rdmNum.toFixed(2); 
    }

    if(oilPrice < 20) {
      let rdmNum = (Math.random() * (1.5 - .95) + 0.95)
      console.log(rdmNum.toFixed(2))
      return rdmNum.toFixed(2);
    }
  
    
  }

  useEffect(() => {
    if (gameStart) { 
      // Time clock to add each second as if it was 1 hour, and add 1 day after 24 seconds elapse
      setTimeout(() => {
        if (hour < 23) {
          setHour(hour + 1);
          setOilPrice(oilPrice * getRandomOilPrice())
        } else {
          setHour(0);
          setDay(day + 1);
          setBank(bank + 1000)
          
          ;
        }
      }, 1000);
    }
  }, [ hour, day]);

 

  return (
    <>
      <View style={tw.style("bg-blue-100 p-5 flex ")}>
        <Text style={tw.style("text-black text-7 mt-10 text-center")}>
          Day: {day} Hour:{hour}
        </Text>
        <Text
          style={tw.style(
            "text-center mt-2 text-10 bg-blue-500 text-black rounded-xl"
          )}
        >
          Oilfield Game
        </Text>
        <Text style={tw.style("text-center mt-2 text-10 text-black")}>
          Bank: {`$${bank}`}
        </Text>
        <Text style={tw.style("text-center mt-2 text-10 text-black")}>
          Field Name: {name}
        </Text>
        <Text style={tw.style("text-center mt-2 text-8 text-black")}>
          Oil Price: {oilPrice.toFixed(2)}/per bbl
        </Text>

        <StatusBar style="auto" />
      </View>

      <ImageBackground
        style={tw.style("h-[100%]")}
        source={require("../assets/oilbackground.jpg")}
      >
        <View>
          <Button  title="Click to start" />
        </View>
      </ImageBackground>
    </>
  );
}
