

export const unixDateToHour = (unixTimestamp, timezone) => {
    const miliseconds = (unixTimestamp + timezone) * 1000;
    const dateObject = new Date(miliseconds); 
    return  dateObject.toLocaleString( 'pt-BR', {timeZone: 'UTC', hour12: false, hour: '2-digit', minute:'2-digit'} )
}

export const unixDateToLongDate = (unixTimestamp) => {
    const miliseconds = unixTimestamp * 1000;
    const dateObject = new Date(miliseconds);
    return  dateObject.toLocaleString( 'pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } )
}

 