import { useEffect, useState } from "react";


const checkActive = (activeCards, url) =>{
    return activeCards.includes(url)
}


function DisplayCards(props){

    const [activeCards, setActiveCards] = useState([]);
    const arrayofActiveCards = activeCards;
    const tempArray = props.arr.map(x => x)

    return(
        <>
            {props.pokemonURL.map((url,index) => 
                
                <div className= "cardContainer" key={index} onClick={() => {
                    props.clickfunction(tempArray);
                    props.setscore(props.currentscore + 1);
                    
                    let urlActive = checkActive(activeCards, url);

                    if ( urlActive === true){
                        // card has already been clicked 

                        let newCurrentBest = Math.max(props.currentbest, props.currentscore);
                        props.setbest(newCurrentBest);
                        props.setscore(0);
                        setActiveCards([]);
                        
                    }

                    else{
                        // card hasnt been clicked
                        arrayofActiveCards.push(url);
                        setActiveCards(arrayofActiveCards);
                    }

                }}> 
                    <img className = "pokemonImageStyle" src = {url}></img>
                </div>
            )}
        </>
    )
}



function GeneratePokemon(props){

    const [pokemon, setPokemon] = useState([]);

    const shuffle = (arr) => {

        let currentIndex = arr.length;
        while (currentIndex !== 0){
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }

        setPokemon(arr);
        
    }

    useEffect( ()=>{

        if ( props.URLArray.length !== 0){

            const wrapperFn = async () => {

                const fetchAllPokemon = async () =>{
                    const imagesArray = await Promise.all(
                        props.URLArray.map(url => fetch(url).then(res => res.json()).then(data=> data.sprites.front_default))
                    )
                    
                    shuffle(imagesArray)
                }

                await fetchAllPokemon();

            }

            wrapperFn();
        }

    },[props.URLArray])

    return(
        <>
            <DisplayCards currentbest = {props.currentbest} setbest = {props.setbest} pokemonURL = {pokemon} clickfunction = {shuffle} arr={pokemon}  setscore =  {props.setscore} currentscore = {props.currentscore} />
        </>
    )
}

export default function CardsMain(props){

    return(

        <>
            <div className="cards">
                <GeneratePokemon currentbest = {props.currentbest} setbest = {props.setbest} URLArray = {props.URLArray} setscore =  {props.setscore} currentscore = {props.currentscore} />
            </div>
        </>
    )
}

