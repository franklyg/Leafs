import { useEffect, useState } from 'react';

function Counter ({ countDownTime }){

    const [countDown, setCountDown] = useState('')

    useEffect(() => {
        var countDownDate = new Date(countDownTime).getTime();
        
        var x = setInterval(function() {
    
        var now = new Date().getTime();

        var distance = countDownDate - now;
            
        
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        setCountDown(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
            
        if (distance < 0) {
            clearInterval(x);
            setCountDown("EXPIRED");
        }
        }, 1000);
        console.log(countDown)

    }, [])

    return (
        <div>
            {countDown}
        </div>
    )
}

export default Counter;