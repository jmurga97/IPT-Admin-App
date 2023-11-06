const onAddTicketCounter = async (kioskoId,handleAddTicketCounter,newTicketCount) => {
    //Para llevar un contador de los tickets vendidos en el dia, debo guardar el contador en localStorage hasta que el dia haya cambiado.
    //Si el dia cambio, entonces se guardan los datos con un key del dia siguiente
    const date = new Date()
    //getDate da la fecha como un int - 22, 23, 24...
    const now = date.getDate().toString()
    console.log('onAddTicketCounter',newTicketCount)
    //Verifico si hay datos en el dia
    if(localStorage.getItem(now)){
        localStorage.setItem(now, JSON.stringify({
            counter: newTicketCount,
            timestamp: date
        }))
    }else{
    //Si la fecha no coincide con el key, agrego los datos con la key del dia nuevo
        localStorage.setItem(now,JSON.stringify({
            counter: newTicketCount,
            timestamp: date
        }))
        const dayBefore = (Number(now)-1).toString()
        if(localStorage.getItem(dayBefore)){
            const ticketsOfTheDayBefore = await JSON.parse(localStorage.getItem(dayBefore))
            localStorage.removeItem(dayBefore)
            handleAddTicketCounter(kioskoId,ticketsOfTheDayBefore)
        }
    }
}

export default onAddTicketCounter;