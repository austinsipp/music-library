import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

export default function ArtistView () {
    const {id} = useParams()
    const [artistData, setArtistData] = useState([])

    return <div>
        <h2>the id passed is: {id}</h2>
        <p>Artist Data Goes Here</p>
    </div>
}