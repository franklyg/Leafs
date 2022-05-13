import React from 'react';

function Message({playing, score, team}){
    var responses = [
        "Nope",
        "F*ck my life",
        "Triple D is probably on.",
        "WTF",
        "LOL",
        "I can't take this",
        "Why am I watching this?",
        ":(",
        "💩",
        "#sad"
    ]
    
    var scoreArray = []
    var teamArray = []
    function responseRender(){
        var randomNumber = Math.floor(Math.random()*responses.length);
        return responses[randomNumber];
    }
    function scoreDiff(){
        Object.entries(score).map((e, i)=>(
            scoreArray.push(e[1]),
            teamArray.push(e[0])
        ))
        console.log(scoreArray)
        return (
            <>
            {/* AWAY */}
            {
                teamArray[0] === team && scoreArray[0] > scoreArray[1] ?
                <p>YES</p>
                :
                null
            }
            {
                teamArray[0] === team && scoreArray[0] < scoreArray[1] ?
                <p>NO</p>
                :
                null
            }
            {
                teamArray[0] === team && scoreArray[0] === scoreArray[1] ?
                <p>TIED</p>
                :
                null
            }
            {/* HOME */}
            {
                teamArray[1] === team && scoreArray[1] > scoreArray[0] ?
                <p>YES</p>
                :
                null
            }
            {
                teamArray[1] === team && scoreArray[1] < scoreArray[0] ?
                <p>NO</p>
                :
                null
            }
            {
                teamArray[1] === team && scoreArray[1] === scoreArray[0] ?
                <p>TIED</p>
                :
                null
            }
            </>
        )
    }
    return(
        <div className="component-score">
            <div className="message">
               {
                   playing ? 
                   <>
                    {
                      scoreDiff()  
                    }
                   </>
                   :
                   <p>Not Playing</p>
               } 
            </div>
        </div>
    )
}
export default Message;
