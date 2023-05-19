import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { ChartCard, Error, Loader, SongCard } from '../components'
import { fetchDataFromApi } from '../utils/api'
// import { useGetTopChartsQuery } from '../redux/services/jioSavaanapi';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  // const { data:s, isFetching, error } = useGetTopChartsQuery();
// if (isFetching) return <Loader title="Loading songs...." />*
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  // if (error) return <Error title="Error in Loding Songs" />;
  
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
        <h2 className="font-bold text-3xl text-white text-left">Top Charts</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data.charts.map((song, i) => (
          <ChartCard
            key={song.id}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.data.charts}
          />
        ))}
      </div>
    </div>
  )
}

export default TopCharts
