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
    function responseRender(){
        var randomNumber = Math.floor(Math.random()*responses.length);
        return responses[randomNumber];
    }
    return(
        <div className="component-score">
            <div className="message">
                {
                    Object.entries(score).map((e, i)=>(
                        <>
                            {
                            e[0].indexOf('scores') > -1  ?
                            <div key={i}>
                                {/* HOME */}
                                {
                                    <>{
                                        Object.entries(e[1])[1][0] === team ?
                                        <p key={i}>
                                            {
                                                (Object.entries(e[1])[1][1] > Object.entries(e[1])[0][1]) ?
                                                
                                                <p>YES</p>
                                                :
                                                null
                                            }
                                            {
                                                (Object.entries(e[1])[1][1] < Object.entries(e[1])[0][1]) ?
                                                responseRender()
                                                :
                                                null
                                            }
                                            {
                                                (Object.entries(e[1])[1][1] === Object.entries(e[1])[0][1]) ?
                                                
                                                <p>TIED</p>
                                                :
                                                null
                                            }
                                        </p>
                                        :
                                        null
                                    }
                                    </>
                                }
                                {/* AWAY */}
                                {
                                Object.entries(e[1])[0][0] === team ?
                                    <p key={i}>
                                        {
                                            (Object.entries(e[1])[0][1] > Object.entries(e[1])[1][1]) ?
                                            
                                            <p>YES</p>
                                            :
                                            null
                                        }
                                        {
                                            (Object.entries(e[1])[0][1] < Object.entries(e[1])[1][1]) ?
                                            responseRender()
                                            :
                                            null
                                        }
                                        {
                                            (Object.entries(e[1])[0][1] === Object.entries(e[1])[1][1]) ?
                                            
                                            <p>TIED</p>
                                            :
                                            null
                                        }
                                    </p>
                                    :
                                    null
                                }
                                {/* INACTIVE */}
                                {
                                    (Object.entries(e[1])[0][0] === team) || (Object.entries(e[1])[1][0] === team) ?
                                    null
                                    :
                                    <p key={i}>NO GAME</p>
                                }
                            </div>
                            :
                            null
                            }
                        </>
                    ))
                }   
            </div>
        </div>
    )
}
export default Message;
