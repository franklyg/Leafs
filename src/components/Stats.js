import React, {useEffect, useRef, useState} from 'react';
import tbLogo from './../tb-logo.png';

function Stats({stats, team, teamInfo}) {
    const teamConfirm = teamInfo !== undefined ? teamInfo.home.abbreviation : null
    
    return (
        <div className='stats'>
            <div className='stats--inner'>
                <div className='away'> 
                    { stats.map(s => {
                        return(
                            <>
                                {
                                    teamConfirm !== s.team ?
                                    <p>{s.scorer.player}</p>
                                    :
                                    null
                                }
                            </>
                        )
                    }) }
                </div>
                <div>
                    <a href="https://tallboywater.com/" className="sponsor">
                      <p>Presented by</p>
                      <img src={tbLogo} alt="Tall Boy"/>
                    </a>
                </div>
                <div className='home'>
                    { stats.map(s => {
                        return(
                            <>
                                {
                                    teamConfirm === s.team ?
                                    <p>{s.scorer.player}</p>
                                    :
                                    null
                                }
                            </>
                        )
                    }) }
                </div>
            </div>
        </div>
    )
    
}
export default Stats;
