import React, {useEffect, useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setmovieName] = useState('');
  const [review, setReview] = useState('');
  const [reviewsList, setReviewsList] = useState([]);
  const [newReview, setNewReview] = useState("");


  useEffect(() =>{
    Axios.get("http://localhost:3001/api/get").then((response) =>{
      setReviewsList(response.data);
    });
  },[]);

  const submitReview = () =>{
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName, 
      review: review
    });

    setReviewsList([
      ...reviewsList,
      {movieName:movieName, review:review},
    ])
  };

  const deleteReview = (movie) =>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) =>{
    Axios.put("http://localhost:3001/api/update",{
      movieName: movie, 
      review: newReview,
    });
    setNewReview("")
  };

  return (
    <div className="App">
      <h1>CRUD</h1>
      <div className="form">
        <label>Name</label>
        <input type="text" name="moviename" onChange = {(e)=>{
          setmovieName(e.target.value)
        }}/>
        <label>Review</label>
        <input type="text" name="review" onChange = {(e)=>{
          setReview(e.target.value)
        }}/>
        <button onClick= {submitReview} >Submit</button>        
        <br/>
          {reviewsList.map((val)=>{
            return(
              <div className="review_div">
                  <h1>{val.movieName}</h1> 
                  <p>{val.review}</p>
              
                  <button onClick={() =>{
                        deleteReview(val.movieName)
                      }}
                      id="btn">
                      Delete
                  </button>
                  <input type="text" id="input_field" onChange = {(e) =>{
                      setNewReview(e.target.value)
                  }}
                    />
                  <button onClick={() =>{
                        updateReview(val.movieName)
                      }}
                      id="btn"
                      >
                      Update
                  </button>
              </div>
              
            );
          })}
      </div>
    </div>
  );
}
export default App;
