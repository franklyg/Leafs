import React, {useState, useEffect} from 'react';

function Score(){

    const [score, setScore] = useState([]);
    const [playing, setPlaying] = useState(true)

    var responses = [
        "Nope",
        "F*ck my life",
        "Triple D is probably on.",
        "WTF",
        "LOL",
        "I can't take this",
        "Why am I watching this?"
    ]

    useEffect(() => {
        fetch('https://nhl-score-api.herokuapp.com/api/scores/latest')
        .then(results => results.json())
        .then(data => {
            setScore(data.games)
            data.games.filter(i => 
                i.scores['TOR']
            ).forEach(e=>{
                e.scores['TOR'] === undefined ? 
                setPlaying(false)
                : 
                setPlaying(true)
            })
        });
    }, []);

    function responseRender(){
        var randomNumber = Math.floor(Math.random()*responses.length);
        return responses[randomNumber];
    }

    return(
        <div className="component-score">
            <div className="message">
                {
                    score.filter(e => 
                        e.scores['TOR'] ?
                        e.scores['TOR']
                        :
                        null

                    ).map((e, i) => {
                        
                        var scoreItem = Object.entries(e.scores)
                        return(
                            e.status.state === 'FINAL' ?
                            <div>
                                {
                                    scoreItem[0][1] > scoreItem[1][1] // Winning at Home
                                    || 
                                    scoreItem[1][1] > scoreItem[0][1] ? // Winning Away
                                    <p>We Won.</p>
                                    :
                                    <p>Onto the next one.</p>
                                }
                            </div>
                            :
                            <div>
                                {
                                    scoreItem[0][1] > scoreItem[1][1] || scoreItem[1][1] > scoreItem[0][1] ? // Winning Away
                                    <p>We're winning.</p>
                                    :
                                    <p>{responseRender()}</p>
                                }
                            </div>
                            
                        )
                    })
                }
                {
                    !playing ?
                    null
                    :
                    <p>Sorry, Bud. Come back soon.</p>
                }
            </div>
            <div className="score">
            {
                score.filter(e => e.scores['TOR'])
                .map((e,i) => {
                    return(
                        e.scores['TOR'] ?
                        <React.Fragment key={i}>
                            {
                                e.scores['TOR'] ?
                                <p>{JSON.stringify(e.scores).replace(/[{}:"",overtime,true]/g, ' ')}</p>
                                :
                                <p>Sorry</p>
                            }
                        </React.Fragment>
                        :
                        <p>NOTHING HERE</p>
                    )
                })
            }
            {
                !playing ?
                null
                :
                <p>LEAFSFOREVER</p>
            }
            </div>
        </div>
    )
}
export default Score;
