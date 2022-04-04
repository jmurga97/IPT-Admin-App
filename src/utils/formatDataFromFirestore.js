
const formatDataFromFirestore = (querySnapshot) => {
    const dataArray = []
    querySnapshot.forEach((doc) => {
        dataArray.push({ ...doc.data() });
    });
    return dataArray
}

export default formatDataFromFirestore;