import React    from 'react';

function Score({playing, score, team}){
    return(
        
        <div className="score">
            {
                Object.entries(score).map((e, i)=>(
                    <>
                        <p key={i}>{ e[0] } { e[1] }</p>
                    </>
                ))
            }
        </div>
    )
}
export default Score;
