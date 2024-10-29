import React, { useEffect, useState } from 'react';
import leafs from './../leafs-logo.png'
import Counter from './Counter';

function Message({playing, score, team, status, startTime}){
    
    function scoreDiff(){

        var scoreArray = []
        var teamArray = []

        Object.entries(score).map((e, i) => {
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
                <>
                {
                    status === 'FINAL' ?
                    <p>WE WON</p>
                    :
                    <p>YES</p>
                }
                </>
                :
                null
            }
            {
                teamArray[0] === team && scoreArray[0] < scoreArray[1] ?
                <>
                    {
                        status === 'FINAL' ?
                        <p>WE LOST</p>
                        :
                        <p>NO</p>
                    }
                </>
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
                <>
                {
                    status === 'FINAL' ?
                    <p>WE WON</p>
                    :
                    <p>YES</p>
                }
                </>
                :
                null
            }
            {
                teamArray[1] === team && scoreArray[1] < scoreArray[0] ?
                <>
                    {
                        status === 'FINAL' ?
                        <p>WE LOST</p>
                        :
                        <p>NO</p>
                    }
                </>
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
               {
                   playing ? 
                   <div className='load-out preloader'>
                       <img src={leafs} className="logo" alt="Leafs logo"/>
                       <Counter countDownTime={ startTime } />
                   </div>
                   :
                   null
                //    <div className='load-in preloader'>
                //         {/* <img src={leafs} className="logo" alt="Leafs logo"/> */}
                //         {/* <p>Back at it next year.</p> */}
                //     </div>
               } 
            </div>
        </div>
    )
}
export default Message;
