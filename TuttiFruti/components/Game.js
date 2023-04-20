import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert, TouchableOpacity } from 'react-native';
    
function Game({onQuery, onLastCategory}){
    const styles = StyleSheet.create({
        box: {
            marginVertical: 40,
        },
        info: {
            marginTop: 50
        },
        grid:{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 10,
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E2879C',
            borderRadius: 8,
            padding: 10,
            margin: 10,
          },
        buttonImageIconStyle: {
            padding: 10,
            margin: 5,
            height: 65,
            width: 65,
            resizeMode: 'stretch',
          },
          buttonIconSeparatorStyle: {
            backgroundColor: '#fff',
            width: 1,
            height: 50,
          },
        buttonText: {
            fontSize: 20,
            color: '#FFFFFF',
            textAlign: 'right',
            marginBottom: 4,
            marginLeft: 10,

        }, 
        texto: {
            fontSize: 20,
            color: 'black',
        }, 
        textBox: {
            marginLeft: 10,
            width: '50%',
            paddingVertical: 4,
            backgroundColor: '#FFC164',
            borderRadius: 10,
        },
        shadow01: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
        },
        texto01: {
            textAlign: 'left',
            marginLeft: 8,
            fontWeight: 'semibold',
            fontVariant: 'semibold',
        }
    });
    const animales = ['Alce', 'Ardilla', 'Aguila', 'Abeja', 'Avispa',
    'Bufalo', 'Ballena', 'Burro', 'Buho', 'Buitre',
    'Caballito de mar', 'Camaleon', 'Cebra', 'Caballo', 'Cangrejo', 'Cisne', 'Cerdo', 'Cocodrilo', 'Conejo',
    'Delfin',
    'Erizo', 'Elefante', 'Escarabajo', 'Escorpion',
    ];
const objetos = ['Anteojos', 'Abrigo',
                 'Balde', 'Banco', 
                 'Cuchara', 'Caja', 
                 'Diario', 
                 'Esponja', 
                 'Foto', 
                 'Gancho', 
                 'Hacha', 
                 'Iman', 
                 'Jarra', 
                 'Karaoke', 'Kayak', 
                 'Llave', 'Lapiz', 
];
const comida = ['Anana', 'Albondiga', 'Arroz', 'Alcaucil', 'Azucar', 'Alfajor', 'Anchoas', 'Arandanos', 'Atun', 'Ajo',
                'Banana', 'Berenjena', 'Brocoli', 'Bacalao', 'Buñuelos', 'Bolas de fraile', 'Budin', 'Batata', 'Bizcochuelo', 'Bife',
        
];
const colection = [animales, objetos, comida];
const [letter, setLetter] = useState();
let words = [];
const category = {
    number: 0,
    name: 'Animales'
}

/*Functionality */
function setUpper(colection){
    for(let posColection in colection){
        let element = colection[posColection]
        for(let posElements in element){
            element[posElements] = element[posElements].toUpperCase();
        }
        element.sort();
    }
}
function getRandom(min, max) {
    let answer = Math.trunc(Math.random() * (max+1 - min) + min);
    while (answer===87 || answer === 88){
        answer = Math.trunc(Math.random() * (max+1 - min) + min);
    }
    return answer;
  }
  
function getWords(letter){
    let posWords = [];
    let answerWords = [];
    for (let posColection in colection){
        posWords.push(findFirstAndLast(colection[posColection], letter));
    }
    for(let words in posWords){
        let appears = posWords[words];
        let category = colection[words];
        if(appears[0] === -1){
            answerWords.push ('No hay');
        }else{
            answerWords.push(category[getRandom(appears[0], appears[1])]);
        }
    }
    return answerWords;
}
function getRandomB(min, max) {
    let answer = [];
    for(let i=0; i<max; i++){
        let number = getRandom(min, max-1);
        while(repeated(answer, number)){
            number = getRandom(min, max-1);
        }
        answer.push(number);
    }
    return answer;
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
function findFirstAndLast(arr,x){
    let n = arr.length;
    let first = -1, last = -1;
    let answer = [first, last];
    for (let i = 0; i < n; i++) {
        let word = arr[i];
        if (x !== word[0])
            continue;
        if (first === -1)
            first = i;
            last = i;
        }
        if (first !== -1) {
            answer = [first, last];
        }
    return answer
}
function createButtons(options){
    let answer = [];
    for(let option in options){
      answer.push(<View><TouchableOpacity key={option} style={[styles.button, styles.shadow01]}onPress={() => {buttonClicked; chequear(options[option], option)}}>
        <Image source={require('../assets/icon.png')} style={styles.buttonImageIconStyle}/>
        <View style={styles.buttonIconSeparatorStyle} />
        <Text style={styles.buttonText}>{options[option]}</Text>
        </TouchableOpacity></View>);
    }
    return answer;
}
function buttonClicked(event){
    event.preventDefault();
}
const [respuestas, setRespuestas] = useState([]);
function addAnswer(answer){
    let prevAnsw = respuestas;
    prevAnsw.push(answer);
    setRespuestas(prevAnsw);
}

function chequear (value, elementId){
   //Alert.alert(elementId);

   if(parseInt(elementId) === category.number){
    //Alert.alert(elementId)
        Alert.alert("Felicitaciones");
        
        CatHandler();
       
        addAnswer({letra: letter, respuesta: value, categoria:category.name});
        
        if(category.number ===2){
            onLastCategory(category.number);
            handleQuery();
        }
    }
    else{
        Alert.alert("Intenta de nuevo");
    }
    
}
function StartLetter(){
    useEffect(() => {
        setLetter(String.fromCharCode(getRandom(65,89)));
     }, []);
}


const [cat, setCat] = useState(0);
function CatHandler(){
    setCat(category.number+1);
}

function decodeCategory(){
    switch(category.number){
        case 0:
            category.name = 'Animales'; 
            break;
        case 1: 
            category.name = 'Objetos';
            break;
        case 2:
            category.name = 'Comida';
            break;
    }
}

/*Printing*/

function printOptions(options, category){
    let buttons = createButtons(options);
    let pattern = getRandomB(0, buttons.length);
    let answer = [];
    for (let i=0; i<buttons.length; i++){
        let pos = pattern[i];
        answer.push(buttons[pos]);
    }
    return(answer);
    
}

/*Components */



function CategoryPrinted (){   
    category.number = cat;
    decodeCategory();
    return category.name;
   
}
function handleQuery(e){
    if(respuestas !== undefined){
        onQuery(respuestas);
    }
}


    StartLetter();
    setUpper(colection);
    words = getWords(letter);
    return(
    <View key="game">
        <View style={styles.info}>
            <View style={[styles.grid, styles.texto]}>
                <Text style={styles.texto}>Letra:</Text>
                <TouchableOpacity style={styles.textBox}>
                    <Text style={[styles.texto, styles.texto01]}> {letter}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.grid}>
                <Text style={styles.texto}>Categoria: </Text>
                <TouchableOpacity style={styles.textBox}>
                    <Text style={[styles.texto, styles.texto01]}> {CategoryPrinted()}</Text>
                </TouchableOpacity>
            </View>
        
        </View>
        <View style={styles.box}>            
            {printOptions(words, category)}
        </View>
    </View>
    );
}export default Game;