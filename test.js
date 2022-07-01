function add(...numbers) {
  var tally = 0
  for (var number of numbers){
    tally = tally + number
  }
  return tally
}

console.log(add(1,2,3),add(5839603,503574,00968,0))