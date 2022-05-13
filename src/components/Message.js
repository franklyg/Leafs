import React from 'react';

function Message({playing, score, team}){
    
    var scoreArray = []
    var teamArray = []

    function scoreDiff(){
        Object.entries(score).map((e, i)=>{
            const scores = scoreArray.push(e[1])
            const teams = teamArray.push(e[0])
            return {
                scores,
                teams
            }
        })
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
