import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  ScrollView,
  View,
  Button,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";

export default function Home() {
  const [bank, setBank] = useState(1000000);
  const [name, setName] = useState();
  const [oilPrice, setOilPrice] = useState(50);
  const [oilProduction, setOilProduction] = useState(0);
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(1);
  const [gameStart, setGameStart] = useState(true);
  const [multiplyer, setMultiplier] = useState(5);
  const [clockSpeed, setClockSpeed] = useState(1000);

  function getRandomOilProduction(cost) {
    let rdmNum = Math.random() * multiplyer;
    setBank(bank - cost);
    return rdmNum;
  }

  function getRandomOilPrice() {
    if (oilPrice > 20 && oilPrice < 150) {
      let rdmNum = Math.random() * (1.2 - 0.8) + 0.8;
      return rdmNum.toFixed(2);
    }

    if (oilPrice < 20) {
      let rdmNum = Math.random() * (1.5 - 0.95) + 0.95;

      return rdmNum.toFixed(2);
    }

    if (oilPrice > 150) {
      let rdmNum = Math.random() * (1.05 - 0.5) + 0.5;

      return rdmNum.toFixed(2);
    }
  }

  useEffect(() => {
    if (gameStart) {
      // Time clock to add each second as if it was 1 hour, and add 1 day after 24 seconds elapse
      setTimeout(() => {
        if (hour < 23) {
          setHour(hour + 1);
          console.log(multiplyerr)
        } else {
          setHour(0);
          setDay(day + 1);
          setOilPrice(oilPrice * getRandomOilPrice());

          setBank(bank + oilPrice * oilProduction);
        }
      }, clockSpeed);
    }
  }, [day, hour]);

  return (
    <>
      <View style={tw.style("bg-blue-100 p-5 flex ")}>
        <Text
          style={tw.style(
            "text-center mt-10 text-10 bg-blue-500 text-black rounded-xl"
          )}
        >
          Oilfield Game
        </Text>
        <Text style={tw.style("text-black text-7 mt-2 text-center")}>
          Day: {day} Hour:{hour}
        </Text>

        <Text style={tw.style("font-bold text-center mt-2 text-10 text-black")}>
          Bank: {`$${bank.toFixed(2)}`}
        </Text>

        <Text style={tw.style("text-center mt-2 text-8 text-black")}>
          Oil Price: {oilPrice.toFixed(2)}/per bbl
        </Text>

        <Text style={tw.style("bg-red-200 text-center mt-2 text-8 text-black")}>
          Oil Prod: {oilProduction.toFixed(2)}bbls / per Day
        </Text>

        <StatusBar style="auto" />
      </View>

      <ImageBackground
        style={tw.style("h-[100%]")}
        source={require("../assets/oilbackground.jpg")}
      >
        <ScrollView>
          <View>
            <Button
              onPress={() => {
                if (bank >= 100000) {
                  setOilProduction(
                    oilProduction + getRandomOilProduction(100000)
                  );
                }
              }}
              title="Drill well (Cost: $100,000)"
            />

            <Button
              onPress={() => {
                if (bank >= 50000) {
                  setOilProduction(oilProduction * 1.1);
                  setBank(bank - 50000);
                }
              }}
              title="Acidize Wells $50,000 (increase Oil Prod by 10%)"
            />

            <Button
              onPress={() => {
                if (bank >= 10000) {
                  setOilPrice(oilPrice * 1.2);
                  setBank(bank - 10000);
                }
              }}
              title="Influence Market $10,000 (increase Oil price by 20%)"
            />

            <Button
              onPress={() => {
                if (bank >= 50000) {
                  setMultiplier(multiplyer * 1.2);
                  setBank(bank - 50000);
                }
              }}
              title="Drill Better Wells $50,000 (Base prod increase by 20% on each new well)"
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
