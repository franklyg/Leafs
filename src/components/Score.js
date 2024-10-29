import React    from 'react';

function Score({playing, score, team, period, time}){
    return(
        
        <div className="score">
            {
                Object.entries(score).map((e, i)=>(
                    <>
                        <p key={i}>{ e[0] } { e[1] }</p>
                    </>
                ))
            }
            <div className="game-status">
                <p>{period} Period</p>
                <p>{time}</p>
            </div>
        </div>
    )
}
export default Score;
