import React, {useState ,useEffect} from 'react'

//https://github.com/ssokurenko/quotes-react-app/blob/master/src/App.js
//https://www.programiz.com/javascript/examples/get-random-item
//https://type.fit/api/quotes

function Quote() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    getQuotes()},[]);

//get all quotes 
const getQuotes = ()=>{
    fetch('https://type.fit/api/quotes')
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        setQuotes(data);
      })
      //then get a single quote randomly
      .then(
        getQuote(quotes)
        ) 
    }  
const [quote,setQuote] =useState([{
        text:'',author:''
    }]);   
// get a random item from an array
//get a random quote in this case
const  getQuote=(arr) =>{

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    console.log(item)
    //set quote to the randomly selected quote
    setQuote(item)
    return (item)  
}

  return (
    <div>
        <strong>{quote.text} </strong><span>{quote.author}</span><p></p>
    </div>
 
  )
}

export default Quote