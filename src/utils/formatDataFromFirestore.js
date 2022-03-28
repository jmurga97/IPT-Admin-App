
const formatDataFromFirestore = (querySnapshot) => {
    const dataArray = []
    querySnapshot.forEach((doc) => {
        dataArray.push({ ...doc.data() });
    });
    console.log('data Array', dataArray)
    return dataArray
}

export default formatDataFromFirestore;