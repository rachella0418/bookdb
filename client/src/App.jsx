import "./App.css";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [filteredBooks, setFilteredBooks] = useState(null);
  const [showBookTable, setShowBookTable] = useState(false);
  const [showBookBorrowedTable, setShowBookBorrowedTable] = useState(false);
  const [addBookPopUp, setAddBookPopUp] = useState(false);
  const [addMemberPopUp, setAddMemberPopUp] = useState(false);
  const [borrowBookPopUp, setBorrowBookPopUp] = useState(false);
  const [editBookPopUp, setEditBookPopUp] = useState(false);
  const [filterByGenrePopUp, setFilterByGenrePopUp] = useState(false);
  const [filterByAuthorPopUp, setFilterByAuthorPopUp] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();
  }, [refreshData])

  useEffect(() => {
    if (filteredBooks) {
      setBooks(filteredBooks);
    }
  }, [filteredBooks])

  const fetchBooks = async () => {
    axios.get("http://localhost:8080/book/getAllBooks")
    .then(books => {
      setBooks(books.data)
    })
    .catch(err => console.log(err))
  }

  const fetchBorrowedBooks = async () => {
    axios.get("http://localhost:8080/borrowedBook/getAllBooks")
    .then(borrowedBooks => {
      console.log(borrowedBooks);
      setBorrowedBooks(borrowedBooks.data)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="background">
      <div className="title">
        <h1>Book Database</h1>
      </div>
      <div className="featureBox">
        <button className="featureButton" onClick={() => {
          setShowBookTable(!showBookTable);
          setShowBookBorrowedTable(showBookBorrowedTable ? !showBookBorrowedTable: "");
        }}>Book Table</button>
        <button className="featureButton" onClick={() => {
          setShowBookBorrowedTable(!showBookBorrowedTable);
          setShowBookTable(showBookTable ? !setShowBookTable: "");
        }}>Borrowed Table</button>
        <button className="featureButton" onClick={() => setAddBookPopUp(!addBookPopUp)}>Add Book</button>
        {addBookPopUp && <AddBookPopUpMenu />}
        <button className="featureButton" onClick={() => setAddMemberPopUp(!addMemberPopUp)}>Add Member</button>
        {addMemberPopUp && <AddMemberPopUpMenu />}
        <button className="featureButton" onClick={() => setBorrowBookPopUp(!borrowBookPopUp)}>Borrow Book</button>
        {borrowBookPopUp && <BorrowBookPopUpMenu />}
      </div>
      {showBookTable && <BookTable />}
      {showBookBorrowedTable && <BookBorrowedTable />}
      {showBookTable &&
      <div className="featureBox">
        <h3 className="featureLabel">Filter By: </h3>
        <button className="featureButton" onClick={()=> setFilterByGenrePopUp(!filterByGenrePopUp)}>Genre</button>
        {filterByGenrePopUp && <FilterByGenrePopUpMenu/>}
        <button className="featureButton" onClick={()=> setFilterByAuthorPopUp(!filterByAuthorPopUp)}>Author</button>
        {filterByAuthorPopUp && <FilterByAuthorPopUpMenu/>}
        <h3 className="featureLabel">Sort By: </h3>
        <button className="featureButton">ISBN</button>
        <button className="featureButton">Available Copies</button>
      </div>
      }
    </div>
  );

  function FilterByAuthorPopUpMenu() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = (filterByAuthor) => {
      console.log(filterByAuthor);  
      axios.post(`http://localhost:8080/book/filterByAuthor`, {
        filterByAuthor
      })
      .then((books) => {setFilteredBooks(books.data)})
      .catch((err) => {
        console.log("Error: ", err)
      })
      setFilterByAuthorPopUp(!filterByAuthorPopUp);
    };

    return (
      <div className="popUpMenu">
        <div className="popUpContent">  
          <form onSubmit={handleSubmit(onSubmit)}> 
            <h2>Enter an Author</h2>
            <div className="formDiv">
                <label htmlFor="author">Author:</label>
                <input name="author" id="author" {...register('author')} />
              </div>
  
            <div className="formButtonsBox">
              <button className="formButtons" type="submit">Submit</button>
              <button className="formButtons" onClick={() => setFilterByAuthorPopUp(!filterByAuthorPopUp)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function FilterByGenrePopUpMenu() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (filterByGenre) => {
      console.log(filterByGenre);  
      axios.post(`http://localhost:8080/book/filterByGenre`, {
        filterByGenre
      })
      .then((books) => {setFilteredBooks(books.data)})
      .catch((err) => {
        console.log("Error: ", err)
      })
      setFilterByGenrePopUp(!filterByGenrePopUp);
    };

    return (
      <div className="popUpMenu">
        <div className="popUpContent">  
          <form onSubmit={handleSubmit(onSubmit)}> 
            <h2>Select a Genre</h2>
            <div className="formDiv">
                <label htmlFor="genre">Genre:</label>
                <select name="genre" id="genre" {...register("genre")}>
                  <option value="">--Select a Genre--</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Horror">Horror</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
  
            <div className="formButtonsBox">
              <button className="formButtons" type="submit">Submit</button>
              <button className="formButtons" onClick={() => setFilterByGenrePopUp(!filterByGenrePopUp)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function BookBorrowedTable() {
    const handleReturnBook = (borrowedBook) => {
      console.log(borrowedBook)
      axios.post(`http://localhost:8080/borrowedBook/returnBook`, {
        borrowedBook
      })
      .then((res) => console.log(res))
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("Error: ", err)
      })

      window.location.reload()
    }
    return (
        <table>
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Member Email</th>
              <th>Copy Number</th>
              <th>Return Book</th>
            </tr>
          </thead>
          <tbody>
            {
              borrowedBooks.map(borrowedBook => {
                return (
                <tr>
                  <td>{borrowedBook.isbn}</td>
                  <td>{borrowedBook.memberEmail}</td>
                  <td>{borrowedBook.copyNumber}</td>
                  <td>
                    <button onClick={() => handleReturnBook(borrowedBook)}>Return</button>
                  </td>
                </tr>
              ) 
              })
  
            }
          </tbody>
        </table> 
    )
  }

  function BookTable() {
    return (
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
                  <td>{book._id}</td>
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
        </table> 
    )
  }

  function BookFilteredTable() {
    return (
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
                  <td>{book._id}</td>
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
        </table> 
    )
  }

  function BorrowBookPopUpMenu() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm();
  
    const onSubmit = (newBorrowEntry) => {
      console.log(newBorrowEntry);  
      axios.post(`http://localhost:8080/borrowedBook/insertBook`, {
        newBorrowEntry
      })
      .then((res) => console.log(res))
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("Error: ", err)
      })
      setBorrowBookPopUp(!borrowBookPopUp);
      // TODO: success message
      reset();
      setRefreshData(prev => !prev);
      window.location.reload()
    };

    return (
      <div className="popUpMenu">
        <div className="popUpContent">        
          <form onSubmit={handleSubmit(onSubmit)}> 
            <h2>Borrow Book</h2>
            <h3>Enter </h3>
            <div className="formDiv">
              <label htmlFor="memberEmail">Member email:</label>
              <input name="memberEmail" id="memberEmail" type="email" {...register('memberEmail', { required: 'email is required' })} />
              {errors.memberEmail && <p>{errors.memberEmail.message}</p>}
            </div>
            <div className="formDiv">
              <label htmlFor="isbn">ISBN:</label>
              <input name="isbn" id="isbn" {...register('isbn', { required: 'isbn is required' })} />
              {errors.isbn && <p>{errors.isbn.message}</p>}
            </div>
  
            <div className="formButtonsBox">
              <button className="formButtons" type="submit">Borrow</button>
              <button className="formButtons" onClick={() => setBorrowBookPopUp(!borrowBookPopUp)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function AddMemberPopUpMenu() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm();
  
    const onSubmit = (newMember) => {
      console.log(newMember);  
      axios.post(`http://localhost:8080/member/insertMember`, {
        newMember
      })
      .then((res) => console.log(res))
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("Error: ", err)
      })
      setAddMemberPopUp(!addMemberPopUp);
      // TODO: success message
      reset();
      setRefreshData(prev => !prev);
     window.location.reload()
    };

    return (
      <div className="popUpMenu">
        <div className="popUpContent">        
          <form onSubmit={handleSubmit(onSubmit)}> 
            <h2>ADD MEMBER</h2>
  
            <div className="formDiv">
              <label htmlFor="firstName">First Name:</label>
              <input name="firstName" id="firstName" {...register('firstName', { required: 'firstName is required' })} />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
  
            <div className="formDiv">
              <label htmlFor="lastName">Last Name:</label>
              <input name="lastName" id="lastName" {...register('lastName', { required: 'lastName is required' })} />
              {errors.title && <p>{errors.title.message}</p>}
            </div>
  
            <div className="formDiv">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input name="dateOfBirth" id="dateOfBirth" type="date" {...register('dateOfBirth', { required: 'Date of Birth is required' })} />
            </div>

            <div className="formDiv">
              <label htmlFor="_id">Email:</label>
              <input name="_id" id="_id" type="email" {...register('_id', { required: 'Email is required' })} />
            </div>
    
            <div className="formButtonsBox">
              <button className="formButtons" type="submit">Add</button>
              <button className="formButtons" onClick={() => setAddMemberPopUp(!addMemberPopUp)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
      <div className="popUpMenu">
        <div className="popUpContent">        
          <form onSubmit={handleSubmit(onSubmit)}> 
            <h2>EDIT BOOK</h2>
  
            <div className="formDiv">
              <label htmlFor="_id">ISBN:</label>
              <input id="_id" value={selectedBook._id} disabled/>
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
              <select name="genre" id="genre" defaultValue={selectedBook.genre} onChange={handleChange}>
                <option value="">--Select a Genre--</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Horror">Horror</option>
                <option value="Thriller">Thriller</option>
              </select>
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
      reset();
      setRefreshData(prev => !prev);
      window.location.reload()

    };
  
    return (
      <div className="popUpMenu">
        <div className="popUpContent">        
          <form onSubmit={handleSubmit(onSubmit)}> 
            <h2>ADD BOOK</h2>
  
            <div className="formDiv">
              <label htmlFor="_id">ISBN:</label>
              <input name="_id" id="_id" {...register('_id', { required: 'ISBN is required' })} />
              {errors._id && <p>{errors._id.message}</p>}
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
              <select name="genre" id="genre" {...register('genre')}>
                <option value="">--Select a Genre--</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Horror">Horror</option>
                <option value="Thriller">Thriller</option>
              </select>
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
