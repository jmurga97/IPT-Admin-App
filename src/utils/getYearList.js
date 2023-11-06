const getYearList = () => {
    const firstYear = 2022
    const date = new Date()
    const lastYear = date.getFullYear()
    let yearList = []

    if(firstYear === lastYear){
        return [firstYear]
    }
    for(let i = 0; i < lastYear - firstYear; i++){
        let current = firstYear + i
        yearList = [...yearList, current]
    }


    return [...yearList, lastYear]
}

export default getYearList;