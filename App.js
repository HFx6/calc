import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, Alert, StyleSheet, Text, View, Pressable, TouchableOpacity, Button } from 'react-native';
import CButton from './components/button';

const windowWidth = Dimensions.get('window').width;

export default function App() {
  const [value, setVal] = useState("");
  const [equal, setEqual] = useState("");
  const [calcfontSize, setcalcfontSize] = useState(100);
  
  const noneval = ["*", ".", "+", "/", "-"];

  
  

  useEffect(() => {   

    // var st = String(equal).length;
    // if(st>6){
    //   setcalcfontSize(calcfontSize-((st-6)));
    //   console.log(calcfontSize-((st-6)));
    // }
    
  }, [equal, value]);

  function handleOperation(val){
    // value is top
    // equal is bottom
    var newvalue = value;
    var newequal = equal;
    var calcfontSize = 100;
    
    if(val=="AC"){
      setVal('');
      setEqual();
      return;
    }else if(val=="⌫"){
      setVal(newvalue.slice(0, -1));
    }else{
      if(val=="="){
        console.log();
        if(noneval.includes(newvalue.slice(-1)) || newvalue.length==0){
          // do nothing?
        }else{
          setEqual(eval(newvalue));
          setVal(eval(newvalue));
        }
      }
      else{
        if(val=="×"){
          if(newvalue.slice(-1)=="/"){
            setVal(newvalue.slice(0, -1)+"*");
          }else{
            setVal(newvalue+"*");
          }
        }else if(val=="÷"){
          if(newvalue.slice(-1)=="*"){
            setVal(newvalue.slice(0, -1)+"/");
          }else{
            setVal(newvalue+"/");
          }
        }else if(val=="±"){
          if(newvalue==newequal){
            setEqual(newvalue* -1);
            setVal(newvalue* -1);
          }
        }
        else{
          setVal(newvalue+String(val));
          try{
            setEqual(eval(newvalue+String(val)));
          }catch{
            // nothing
          }
        }
      }
      
    }
  }
  
  const CalcPressable = (props) =>{
    return(
      <Pressable style={{width: '100%'}} onPressIn={() => handleOperation(props.keyValue)}>
        <Text style={[{fontWeight: 'bold', padding: (windowWidth/5)*0.28, textAlign: 'center', borderRadius: 20, fontSize: 30, justifyContent: 'center'}, props.styleProps]}>{props.keyValue}</Text>
      </Pressable>
    )
  }
  return (
    <View style={styles.container}>

      <View style={styles.top}>
        <View style={{position: 'absolute', right: 30, bottom: 10, width: '90%'}}>
          <View style={{width: '100%', height: 45}}>
            <Text adjustsFontSizeToFit
              numberOfLines={1} style={styles.equalvalue}>{value}</Text>
          </View>
          <View style={{width: '100%', height: 110}}>
            <Text adjustsFontSizeToFit
              numberOfLines={1} style={styles.calcvalue}>{equal}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.flexcontain}>
          <View style={styles.subflex}><CalcPressable keyValue={"AC"} styleProps={{ color: '#f07d42'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={"±"} styleProps={{ color: '#f07d42'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={"%"} styleProps={{ color: '#f07d42'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={"÷"} styleProps={{ color: '#f07d42'}}/></View>
        </View>
        <View style={styles.flexcontain}>
          <View style={styles.subflex}><CalcPressable keyValue={7} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={8} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={9} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={"×"} styleProps={{ color: '#f07d42'}}/></View>
        </View>
        <View style={styles.flexcontain}>
          <View style={styles.subflex}><CalcPressable keyValue={4} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={5} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={6} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={"-"} styleProps={{ color: '#f07d42'}}/></View>
        </View>
        <View style={styles.flexcontain}>
          <View style={styles.subflex}><CalcPressable keyValue={1} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={2} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={3} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={"+"} styleProps={{ color: '#f07d42'}}/></View>
        </View>
        <View style={styles.flexcontain}>
          <View style={styles.subflex}><CalcPressable keyValue={"."} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={0} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={"⌫"} styleProps={{ color: '#6b6b6b'}}/></View>
          <View style={styles.subflex}><CalcPressable keyValue={"="} styleProps={{ color: 'white', backgroundColor: '#f07d42'}}/></View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    width: '100%',
    height: '35%',
  },
  calcvalue: {
    textAlign: 'right',
    color: '#6b6b6b',
    fontSize: 200,
    // width: '100%',
    // height: 110,
    flexShrink: 1,
  },
  equalvalue :{
    textAlign: 'right',
    color: '#a7a7a7',
    fontSize: 30,
    // width: '100%',
    // height: 45,
  },
  bottom: {
    width: '100%',
    height: '65%',
  },
  flexcontain:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignContent: 'center',
    width: '100%',
  },
  subflex: {
    width: windowWidth*0.22,
    textAlign: 'center',
    // backgroundColor: 'lightblue'
  }
});
