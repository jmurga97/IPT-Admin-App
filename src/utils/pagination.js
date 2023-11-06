const pagination = (itemsPerPage,pageNumber,items) => {
    let itemsVisited = 0
    if(pageNumber === 0){
        itemsVisited = 0
      }else{
        itemsVisited = pageNumber * itemsPerPage
      }
    const displayItems = items.slice(itemsVisited, itemsVisited + itemsPerPage)
    const pageCount = Math.ceil(items.length/itemsPerPage)

    return{
        displayItems,
        pageCount
    }
}

export default pagination