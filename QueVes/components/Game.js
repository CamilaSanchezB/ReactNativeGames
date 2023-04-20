import React from "react";
import { Text, View, StyleSheet, Pressable, Alert, Image} from "react-native";
import DisplayGame from "./DisplayGame";
export default function Game(fondo){
    const words = [
        {word: 'MESA',
        img:  require('../assets/ahorcadoMESA.png')},
        {word:'SILLA',
        img: require('../assets/ahorcadoSILLA.png')},
        { word: 'BANCO',
        img: require('../assets/ahorcadoBANCO.png')},
        { word:'PUERTA',
        img: require('../assets/ahorcadoPUERTA.png')}, 
        {word:'TELEVISOR',
        img: require('../assets/ahorcadoTELEVISOR.png')},
        {word:'CELULAR',
        img: require('../assets/ahorcadoCELULAR.png')},
        {word:'CAMA',
        img: require('../assets/ahorcadoCAMA.png')}, /*'SOMBRERO',
        'ANTEOJOS', 'RELOJ', 'ZAPATOS', 'CAMISA', 'PANTALON', 'CORBATA', 'VESTIDO',
        'SACO', 'BOLSA', 'LIBRO', 'CUADERNO', 'LAPIZ', 'GOMA',
        'LAPICERA', 'IMPRESORA','HORNO', 'ESTUFA',
        'HELADERA', 'LAVARROPAS', 'SECADOR', 'MICROONDAS', 'ESCOBA',
        'REPOSERA', 'PELOTA', 'REGADERA', 'INODORO', 'DUCHA', 'MANGUERA',
        'ESPEJO', 'CORTINA', 'PALA', 'RASTRILLO', 'BALDE', 'TIJERAS'*/
    ];
    const [pos, setPos] = React.useState(0);
    const [word, setWord] = React.useState(generateRandomWord(generateRandomPos()));
    const [asteriscos, setAsteriscos] = React.useState(generateAsteriscos());
    const [win, setWin] = React.useState(false);
    const [img, setImg] = React.useState(generateImg());
    const [count, setCount] = React.useState(0);
    const [lettersToBeRendered, setLettersToBeRendered] = React.useState((word.word).split('').map(letter => letter));
    const [answers, setAnswers] = React.useState([]);
    function generateRandomPos(){
        return Math.floor(Math.random() * 7);
    }
    function generateRandomWord(position){
        return words[position];
    }
    
    function generateAsteriscos(){
        return (word.word).split('').map(letter => '_');
    }

    function generateImg(){
        return (word.img);
    }
    const styles = StyleSheet.create({
        card: {
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 40,
            width: '100%',
            height: '75%',
            paddingVertical: 30,
            paddingHorizontal: 20,
        },

        shadow01: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
        },
        title: {
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontVariant: 'semibold',
            fontSize: 32,
            color: 'rgba(0, 0, 0, 0.75)',
        },

        line: {
            borderBottomColor: 'rgba(0, 0, 0, 0.3)',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '50%',
            marginHorizontal: 'auto',
            marginVertical: 5,
        },
        imgWrapper: {
            alignContent: 'center',
            paddingVertical: 20,
            height: '100%',
            width: '100%',
          },
    });
    function nuevoNivel(){
        setAsteriscos(generateAsteriscos());
        setImg(generateImg());
        setLettersToBeRendered((word.word).split('').map(letter => letter));
        setCount(0);
        setWin(false);
    }
    function restartW(){
        setWord(words[pos]);
    }

    function StartG(){
        React.useEffect(()=>{
            setPos(generateRandomPos);
        },[]);
    }
    StartG();
    return(
        <View style={[styles.card, styles.shadow01]}> 
            {answers.length !== 4 && (<Text style={styles.title}>¿Cómo se llama?</Text>)}
            {answers.length !== 4 && (<View style={styles.line}></View>)}
            {answers.length !== 4 && (
                <View style={styles.imgWrapper}>
                   <View style={{alignContent: 'center', alignItems:'center'}}>
                    <Image style={styles.img} source={img} />
                   </View>
                    <DisplayGame wordName={(word.word)} img={img} asteriscos={asteriscos} lettersToBeRendered={lettersToBeRendered} win={win} setCount={setCount} setWin={setWin} count={count} setPos={setPos} pos={pos} generateRandomPos={generateRandomPos} startW={restartW} answers={answers} setAsteriscos={setAsteriscos}/>
                </View>
                )
            }
            <View>
                {win && answers.length !== 4 &&(<Pressable onPress={()=>{nuevoNivel();Alert.alert("Nuevo nivel")}} >
                    {win && (<Text>Nuevo nivel</Text>)}
                </Pressable>
                )}
                </View>
                {win && answers.length === 4 &&(<View>
                    <Text>GANASTE 4/4</Text> 
                    {/*Poner tabla con respuestas*/}
            </View>)}
        </View>
        
    );
}
