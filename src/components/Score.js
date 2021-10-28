import React, {useState, useEffect} from 'react';

function Score(){

    const [score, setScore] = useState([]);
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
        });
    }, []);

    function responseRender(){
        var randomNumber = Math.floor(Math.random()*responses.length);
        return responses[randomNumber];
    }

    return(
        <div className="component-score">
            <div class="message">
                {
                    score.map((e, i) => {
                        if(e.scores['TOR']) {
                        var scoreItem = Object.entries(e.scores)
                        if(e.status.state == 'FINAL'){
                            return(
                                <div>
                                    {
                                        scoreItem[0][0] == 'TOR' && scoreItem[0][1] > scoreItem[1][1] // Winning at Home
                                        || 
                                        scoreItem[1][0] == 'TOR' && scoreItem[1][1] > scoreItem[0][1] ? // Winning Away
                                        <p>We Won.</p>
                                        :
                                        <p>Onto the next one.</p>
                                    }
                                </div>
                            )
                        }
                        else{
                                return(
                                    <div>
                                        {
                                            scoreItem[0][0] == 'TOR' && scoreItem[0][1] > scoreItem[1][1] // Winning at Home
                                            || 
                                            scoreItem[1][0] == 'TOR' && scoreItem[1][1] > scoreItem[0][1] ? // Winning Away
                                            <p>We're winning.</p>
                                            :
                                            <p>{responseRender()}</p>
                                        }
                                    </div>
                                )
                            }
                        }
                    })
                }
            </div>
            <div class="score">
            {
                score.map((e,i) => {
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
                        null
                    )
                })
            }
            </div>
        </div>
    )
}
export default Score;
