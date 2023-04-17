import { useEffect, useState } from 'react'

export default function useFetch(api, su) {
  const [data, setData] = useState([])
  const [dataId, setDataId] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      api
        .then((res) => {
          setData(res.data)
          setDataId(res.data)
        })
        .catch((err) => {
          console.log(err)
          setError(err)
        })
    }
    fetchData()
  }, [su])

  return { data, dataId, error, su }
}
