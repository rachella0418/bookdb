import "./App.css";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [addBookPopUp, setAddBookPopUp] = useState(false);
  const [editBookPopUp, setEditBookPopUp] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    fetchBooks()
  }, [refreshData])

  const fetchBooks = async () => {

    axios.get("http://localhost:8080/book/getAllBooks")
    .then(books => {
      setBooks(books.data)
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="background">
      <div className="title">
        <h1>Book Database</h1>
      </div>
      <div className="addButtonBox">
        <button className="addButton" onClick={() => setAddBookPopUp(!addBookPopUp)}>Add Book</button>
        {addBookPopUp && <AddBookPopUpMenu />}
      </div>
      {
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Available Copies</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map(book => {
              return (
              <tr onClick={() => {
                setEditBookPopUp(!editBookPopUp);
                setSelectedBook(book);
              }}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.availableCopies}</td>
              </tr>
            )
              
            })

          }
          {editBookPopUp && <EditBookPopUpMenu />}

        </tbody>
      </table> }
    </div>
  );

  function EditBookPopUpMenu() {
    const { register, handleSubmit, reset } = useForm({
      defaultValues: selectedBook 
    });

    const onSubmit = (modifiedBook) => {  
      axios.post(`http://localhost:8080/book/updateBook`, {
        modifiedBook
      })
      .then((res) => console.log(res))
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("Error: ", err)
      })
      setEditBookPopUp(!editBookPopUp);
      setRefreshData(prev => !prev);
      window.location.reload()

      reset();
    };

    const handleChange = (event) => {
      const { id, value } = event.target;
      reset({ ...selectedBook, [id]: value });
    };

    const handleDelete = () => {
      axios.post(`http://localhost:8080/book/deleteBook`, {selectedBook})
      .then((res) => console.log(res))
      .catch((err) => {
        console.log("Error: ", err)
      })
      setEditBookPopUp(!editBookPopUp);
      setRefreshData(prev => !prev);
      window.location.reload()
    }

    return (
      <div className="bookPopUpMenu">
        <div className="popUpContent">        
          <form onSubmit={handleSubmit(onSubmit)}> 
            <h2>EDIT BOOK</h2>
  
            <div className="formDiv">
              <label htmlFor="isbn">ISBN:</label>
              <input id="isbn" value={selectedBook.isbn} disabled/>
            </div>
  
            <div className="formDiv">
              <label htmlFor="title">Title:</label>
              <input id="title" defaultValue={selectedBook.title} onChange={handleChange}/>
            </div>
  
            <div className="formDiv">
              <label htmlFor="author">Author:</label>
              <input id="author" defaultValue={selectedBook.author} onChange={handleChange}/>
            </div>
  
            <div className="formDiv">
              <label htmlFor="genre">Genre:</label>
              <input id="genre" defaultValue={selectedBook.genre} onChange={handleChange} {...register('genre')} />
            </div>
  
            <div className="formDiv"> 
              <label htmlFor="copiesAvailable">Number of Copies:</label>
              <input id="copiesAvailable" type="number" defaultValue={selectedBook.availableCopies} onChange={handleChange} {...register('availableCopies')} />
            </div>
    
            <div className="formButtonsBox">
              <button className="formButtons" type="submit">Update</button>
              <button className="formButtons" onClick={handleDelete}>Delete</button>
              <button className="formButtons" onClick={() => setEditBookPopUp(!editBookPopUp)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  function AddBookPopUpMenu() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm();
  
    const onSubmit = (newBook) => {  
      axios.post(`http://localhost:8080/book/insertBook`, {
        newBook
      })
      .then((res) => console.log(res))
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("Error: ", err)
      })
      setAddBookPopUp(!addBookPopUp);
      setRefreshData(prev => !prev);
      window.location.reload()

      reset();
    };
  
    return (
      <div className="bookPopUpMenu">
        <div className="popUpContent">        
          <form onSubmit={handleSubmit(onSubmit)}> 
            <h2>ADD BOOK</h2>
  
            <div className="formDiv">
              <label htmlFor="isbn">ISBN:</label>
              <input name="isbn" id="isbn" {...register('isbn', { required: 'ISBN is required' })} />
              {errors.isbn && <p>{errors.isbn.message}</p>}
            </div>
  
            <div className="formDiv">
              <label htmlFor="title">Title:</label>
              <input name="title" id="title" {...register('title', { required: 'Title is required' })} />
              {errors.title && <p>{errors.title.message}</p>}
            </div>
  
            <div className="formDiv">
              <label htmlFor="author">Author:</label>
              <input name="author" id="author" {...register('author')} />
            </div>
  
            <div className="formDiv">
              <label htmlFor="genre">Genre:</label>
              <input name="genre" id="genre" {...register('genre')} />
            </div>
  
            <div className="formDiv"> 
              <label htmlFor="copiesAvailable">Number of Copies:</label>
              <input name="copiesAvailable" id="copiesAvailable" type="number" {...register('availableCopies', { required: 'Available copies are required' })} />
              {errors.availableCopies && <p>{errors.availableCopies.message}</p>}
            </div>
    
            <div className="formButtonsBox">
              <button className="formButtons" type="submit">Add</button>
              <button className="formButtons" onClick={() => setAddBookPopUp(!addBookPopUp)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
}


export default App;
