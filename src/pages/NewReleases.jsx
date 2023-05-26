import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { NewReleaseCard, SongCard } from '../components'
import { fetchDataFromApi } from '../utils/api'
import SearchCard from '../components/SearchCard'
import SongDetailCard from '../components/SongDetailCard'

const NewReleases = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('hindi')

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/modules?language=${language}`).then((res) => {
      setData(res)
      setLoading(false)
    })
  }
  const filterData = data?.data.albums.filter((e) => e.type === 'album')
 

  useEffect(() => {
    fetchInitialData()
  }, [language])
  const handleSelectChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div className=" flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">New Songs</h2>
        <div className="p-4">
          <select
            onChange={handleSelectChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {filterData?.map((song, i) => (
          <NewReleaseCard
            key={song.id}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={filterData}
          />
        ))}

      </div>

    </div>
  )
}

export default NewReleases
