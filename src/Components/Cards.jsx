import { useEffect, useState } from "react";
import FetchData from "./FetchData";
// import FetchData from "./FetchData";



function DisplayCards(props){
    console.log("final array is",props.pokemonURL);

    return(
        <>
            {props.pokemonURL.map((url,index) => 
                <div className= "cardContainer" key={index} onClick={props.shuffle}> 
                    <img className = "pokemonImageStyle" src = {url}></img>
                </div>
            )}
        </>
    )
}


function GeneratePokemon(props){

    const [pokemon, setPokemon] = useState([]);


    const shuffle = (arr) => {

        //shuffling
        let currentIndex = arr.length;
        while (currentIndex !== 0){
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }

        return arr;

    }

    useEffect( ()=>{

        if ( props.URLArray.length !== 0){

            const wrapperFn = async () => {

                const fetchAllPokemon = async () =>{
                    const imagesArray = await Promise.all(
                        props.URLArray.map(url => fetch(url).then(res => res.json()).then(data=> data.sprites.front_default))
                    )
                    
                    let temp = shuffle(imagesArray)

                    return temp;
                }

                const imagesCall = await fetchAllPokemon();
                setPokemon(imagesCall);
            }

            wrapperFn();
        }

    },[props.URLArray])

    return(
        <>
            <DisplayCards pokemonURL = {pokemon} clickfunction = {shuffle}/>
        </>
    )
}

export default function Cards(props){
    // console.log(props.URLArray,"is the CARDS array");

    return(

        <>
            <div className="cards">
                <GeneratePokemon URLArray = {props.URLArray}/>
            </div>
        </>
    )
}

