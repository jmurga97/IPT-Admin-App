const pagination = (itemsPerPage,pageNumber,items) => {
    const itemsVisited = pageNumber + itemsPerPage
    const displayItems = items.slice(itemsVisited, itemsVisited + itemsPerPage)
    const pageCount = Math.ceil(items.length/itemsPerPage)

    return{
        displayItems,
        pageCount
    }
}

export default pagination