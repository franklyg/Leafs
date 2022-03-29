import React    from 'react';

function Score({playing, score, team}){
    return(
        
        <div className="score">
            {
                Object.entries(score).map((e, i)=>(
                    <>
                        {
                            e[0].indexOf('scores') > -1  ?
                            <>
                            <p>{Object.entries(e[1])[1][0]} : {Object.entries(e[1])[1][1]}</p> 
                            <p>{Object.entries(e[1])[0][0]} : {Object.entries(e[1])[0][1]}</p>
                            </>
                            :
                            null
                        }
                    </>
                ))
            }
        </div>
    )
}
export default Score;
