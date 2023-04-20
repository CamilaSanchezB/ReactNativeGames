import React from "react";
import { Text, View, StyleSheet, Pressable, Alert, Image } from "react-native";
export default function DisplayGame({wordName, img, asteriscos, lettersToBeRendered, win, setCount, setWin, count, setPos, pos, generateRandomPos, startW, answers, setAsteriscos}){
    const styles = StyleSheet.create({
    imgWrapper: {
        alignContent: 'center',
        paddingVertical: 20,
        height: '100%',
        width: '100%',
    },
    img: {
        height: '45%',
        width: '100%',
        borderRadius: 10,
    },
    grid:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dashes: {
        fontSize: 50,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#004597',
        borderRadius: 8,
    
        padding: 10,
        margin: 10,
      },
    buttonText: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    }, 
        
    });
    
    function DisplayLetters(){
        
        let answer = [], usedPos = [];
        for(let i=0; i<wordName.length; i++){
            let pos = Math.trunc(Math.random() * (wordName.length));
            while(repeated(usedPos, pos) === true){
                pos = Math.trunc(Math.random() * (wordName.length - 0) + 0);
            }
            usedPos.push(pos);
        }
        for(let i=0; i<wordName.length; i++){
            if(lettersToBeRendered[usedPos[i]] !== undefined){
                answer.push(LetterPressable(lettersToBeRendered[usedPos[i]], i));
            }
        }
        return(answer);
    }
    function repeated(arr, number){
        let answer = false, i=0;
        while (i<arr.length && answer === false){
            if(number === arr[i]){
                answer = true;
            }
            i++;
        }
        return answer;
    }
    function LetterPressable(letter, index){
        return(
               <Pressable key={letter + index} onPress={()=>{onPressFunction(letter)}} style={styles.button}>
                    <Text style={styles.buttonText}>{letter}</Text>
                </Pressable>);
    }
    function onPressFunction(letra){
        lettersToBeRendered.splice(lettersToBeRendered.indexOf(letra), 1);
         asteriscos[count] = letra;
         setCount(count+1);
         if(count === wordName.length-1){
             let finishedWord = '';
             for(decodedAsterisco in asteriscos){
                 finishedWord+=asteriscos[decodedAsterisco];
             }
             if(finishedWord === wordName){
                answers.push({word: wordName, img: img});
                console.log(answers);
                setWin(true);
                let answer = generateRandomPos();
                while(answer === pos){
                    answer = generateRandomPos();
                }
                setPos(answer);
                startW();
             }else{
                Alert.alert("La palabra ingresada es incorrecta. \nEl objeto se llama "+wordName+". \n¡Intentemos con uno nuevo!");
                answers.push({word: wordName, img: img});
                setAsteriscos((wordName).split('').map(letra => letra));
                console.log(answers);
                setWin(true);
                let answer = generateRandomPos();
                while(answer === pos){
                    answer = generateRandomPos();
                }
                setPos(answer);
                startW();
             }
         }
     }
    return(<View >
        
        <Text style={styles.dashes}>{asteriscos.join(' ')}</Text>
        <View style={styles.grid}>
           {DisplayLetters()}
        </View>
        
    </View>
        
    );
}