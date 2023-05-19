import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from '../components'

import { useGetNewReleasesDetailsQuery } from '../redux/services/jioSavaanapi'
import SongDetailCard from '../components/SongDetailCard'
import { useEffect, useRef, useState } from 'react'
import { fetchDataFromApi } from '../utils/api'

const NewReleaseDetails = () => {
  const { songid } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  // const {
  //   data: songData,
  //   isFetching: fetchingSongData,
  // } = useGetNewReleasesDetailsQuery({ songid })
  
  // if (fetchingSongData) return <Loader title="Loading songs...." />

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/albums?id=${songid}`).then(
      (res) => {
        setData(res)
        setLoading(false)
      },
    )
  }

  useEffect(() => {
    fetchInitialData()
  }, [])


  return (
    <div  className="flex flex-col">
      <div className="mb-10">
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.data.songs.map((song, i) => (
            <SongDetailCard
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data?.data.songs}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewReleaseDetails
