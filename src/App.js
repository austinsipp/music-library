import './App.css';
import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './contexts/DataContext'
import { SearchContext } from './contexts/SearchContext'


const API_URL = 'https://itunes.apple.com/search?term='

function App() {

  let [message, setMessage] = useState('Search for Music')
  let [data, setData] = useState([])
  let searchInput = useRef('')



  const handleSearch = (e, search) => {
    e.preventDefault()
    const fetchData = async () => {
      try {
        document.title = `${search} Music`
        const response = await fetch(`${API_URL}${search}`)
        const resData = await response.json()
        console.log(resData)
        if (resData.results.length) {
          setData(resData.results)
          setMessage('')
        } else {
          setMessage(`We could find nothing for '${search}'`)
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (search) {
      fetchData()
    }
  }


  return (
    <div className="App">

      <Router>
        {message}
        <Routes>
          <Route path='/' element={
            <>
              <SearchContext.Provider value={
                {
                  term: searchInput,
                  handleSearch
                }
              }>
                <SearchBar />
              </SearchContext.Provider>
              <DataContext.Provider value={data}>
                <Gallery />
              </DataContext.Provider>
            </>
          } />
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
