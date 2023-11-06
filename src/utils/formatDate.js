import dayjs  from 'dayjs'

const formatDate = (timestamp) => {
  dayjs.locale('es')
  let date = ''

  //Firebase regresa un objeto timestamp que debe ser convertido al objeto Date de JS. Si el ticket es agregado mientras se usa la app, no haria falta utilizar toDate
  if(timestamp instanceof Date){
    date = dayjs(timestamp)
  }else{
    date = dayjs(timestamp.toDate())
  }

  return `${date.format("dddd, MMMM D YYYY")} - ${date.format("HH:mm:ss a")}`
}

export default formatDate;