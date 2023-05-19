import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from '../components'

import { useGetSongsDetailsQuery } from '../redux/services/jioSavaanapi'
import SongDetailCard from '../components/SongDetailCard'
import {fetchDataFromApi} from "../utils/api"
const SongDetails = () => {
  const { songid } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const {
    data: songData,
    isFetching: fetchingSongData,
  } = useGetSongsDetailsQuery({ songid })

 

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  // if (error) return <Error title="Error in Loding Songs" />;

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/playlists?id=${songid}`).then((res) => {
      setData(res)
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchInitialData()
  }, [])


  return (
    <div className="flex flex-col" >
      <div className="mb-10">
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {songData?.data.songs.map((song, i) => (
            <SongDetailCard
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={songData?.data.songs}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SongDetails
