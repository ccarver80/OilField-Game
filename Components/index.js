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
  const [bank, setBank] = useState(1000000); // Starting bank is 1 million dollars
  const [name, setName] = useState();
  const [oilPrice, setOilPrice] = useState(50);
  const [oilProduction, setOilProduction] = useState(0);
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(1);
  const [gameStart, setGameStart] = useState(true);
  const [multiplyer, setMultiplier] = useState(5);
  const [clockSpeed, setClockSpeed] = useState(1000);
  const [wellsDrilled, setWellsDrilled] = useState(0);
  const [oilPriceColor, setOilPriceColor] = useState(true);

  function getRandomOilProduction(cost) {
    let rdmNum = Math.random() * multiplyer;
    setBank(bank - cost);
    return rdmNum;
  }

  // Function to get a random factor to multiply to oil price, depending on current oil price determins chance of going up or down
  function getRandomOilPriceFactor() {
    // If oil price is BETWEEN $20 and $150 it can go up or down 20%
    if (oilPrice > 20 && oilPrice < 150) {
      let rdmNum = Math.random() * (1.2 - 0.8) + 0.8;
      setPriceColor(rdmNum);
      return rdmNum.toFixed(2);
    }

    // If oil price is LESS then $20 chance of it goes up 50% or down 5%
    if (oilPrice < 20) {
      let rdmNum = Math.random() * (1.5 - 0.95) + 0.95;
      setPriceColor(rdmNum);
      return rdmNum.toFixed(2);
    }
    // If oil price is MORE than $150 has chance to go up 5% or down 50%
    if (oilPrice > 150) {
      let rdmNum = Math.random() * (1.05 - 0.5) + 0.5;
      setPriceColor(rdmNum);
      return rdmNum.toFixed(2);
    }
  }

  // Function to look at price change factor and change color of oil price if it goes up or down
  function setPriceColor(factor) {
    if (factor >= 1.0) {
      setOilPriceColor(true);
    } else {
      setOilPriceColor(false);
    }
  }

  useEffect(() => {
    if (gameStart) {
      setTimeout(() => {
        if (hour < 23) {
          setHour(hour + 1);
        } else {
          setHour(0);
          setDay(day + 1);
          setOilPrice(oilPrice * getRandomOilPriceFactor());
          setBank(bank + oilPrice * oilProduction);
        }
      }, clockSpeed);
    }
  }, [day, hour]);

  return (
    <>
      <ScrollView style={tw.style("bg-blue-100 flex-col gap-5 p-5 flex")}>
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

        {oilPriceColor ? (
          <Text style={tw.style("text-center mt-2 text-8 text-green-500")}>
            Oil Price: {oilPrice.toFixed(2)}/per bbl
          </Text>
        ) : (
          <Text style={tw.style("text-center mt-2 text-8 text-red-500")}>
            Oil Price: {oilPrice.toFixed(2)}/per bbl
          </Text>
        )}

        <Text style={tw.style("text-center mt-2 text-8 text-black")}>
          Wells Drilled: {wellsDrilled}
        </Text>

        <Text style={tw.style("bg-red-200 text-center mt-2 text-8 text-black")}>
          Oil Prod: {oilProduction.toFixed(2)}bbls / per Day
        </Text>

        <StatusBar style="auto" />

        <Text style={tw.style("text-center mt-2 text-8 text-black")}>
          Upgrades
        </Text>

        <View style={tw.style("flex flex-col gap-5")}>
          {bank >= 100000 && (
            <Button
              onPress={() => {
                if (bank >= 100000) {
                  setOilProduction(
                    oilProduction + getRandomOilProduction(100000)
                  );
                  setWellsDrilled(wellsDrilled + 1);
                }
              }}
              title="Drill well (Cost: $100,000)"
            />
          )}

          {bank >= 50000 && (
            <Button
              onPress={() => {
                if (bank >= 50000) {
                  setOilProduction(oilProduction * 1.2);
                  setBank(bank - 50000);
                }
              }}
              title="Acidize Wells $50,000 (increase Oil Prod by 20%)"
            />
          )}

          {bank >= 10000 && (
            <Button
              onPress={() => {
                if (bank >= 10000) {
                  setOilPrice(oilPrice * 1.2);
                  setBank(bank - 10000);
                }
              }}
              title="Influence Market $10,000 (increase Oil price by 20%)"
            />
          )}

          {bank >= 50000 && (
            <Button
              onPress={() => {
                if (bank >= 50000) {
                  setMultiplier(multiplyer * 1.2);
                  setBank(bank - 50000);
                }
              }}
              title="Drill Better Wells $50,000 (Base prod. increase by 20% on each new well)"
            />
          )}
          {bank >= 50000 && (
            <Button
              onPress={() => {
                if (bank >= 50000) {
                  setClockSpeed(clockSpeed * 0.8);
                  setBank(bank - 50000);
                }
              }}
              title="Speed Up Time (Time clock speeds up by 20%)"
            />
          )}
        </View>
      </ScrollView>
    </>
  );
}
