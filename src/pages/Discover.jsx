import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchDataFromApi } from '../utils/api'
import { SongCard } from '../components'
// import { useGetTopChartsQuery } from '../redux/services/jioSavaanapi'

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  // const { data, isFetching, error } = useGetTopChartsQuery()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/modules?language=hindi,english`).then((res) => {
      setData(res)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchInitialData()
  }, [])



  return (
    <div className=" flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Top Playlists
        </h2>
      </div>
      <div
  
        className="flex flex-wrap sm:justify-start justify-center gap-8"
      >
        {data?.data.playlists.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.data.albums}
          />
        ))}
      </div>
    </div>
  )
}

export default Discover
