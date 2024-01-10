import { useEffect, useState } from "react"
import { API_URL } from "../../configs"
import axios from "axios"
import styles from "./Search.module.scss"
import { useNavigate } from "react-router-dom"

const Search = () =>{
   const [data,setData] = useState([])
   const [searchQuery,setSearchQuery] = useState("")
   const [searchResult,setSearchResult] = useState([])

	const navigate = useNavigate()

   useEffect(() =>{
      ;(async () =>{
         try {
						const response = await axios.get(API_URL)
						const result = await response.data
						setData(result)
					} catch (e) {
						console.log(e)
					}
      })()
   },[searchQuery,searchResult])

   const handleChangeInput = (e) =>{
      const x = e.target.value
      setSearchQuery(x)

      if(!x){
         setSearchResult([])
         return 
      }

      const y = searchQuery.split("")
      
         const result = data.filter(item => {
				return y.every(str => item.id.includes(str))
			})
					setSearchResult(result)
   }

	const handleRedirect = (id) =>{
		setSearchResult([])

		setSearchQuery("")
		navigate({
			pathname:`/${id}`
		})
		
	}

   return (
			<div className={styles.searchBox}>
				<div className={styles.searchInput}>
					<input
						type='text'
						placeholder='Search'
						value={searchQuery}
						onChange={handleChangeInput}
					/>
				</div>
				{searchResult.length && (
					<div className={styles.searchResultBox}>
						{searchResult.map((item, index) => {
							return (
								<div
									className={`${searchResult ? styles.active : ''}`}
									key={index}
								>
									<div
										onClick={() => handleRedirect(item.id)}
									>
										<img
											src={item.image}
											alt={item.name}
											width={30}
											height={30}
										/>
										<p>{item.name}</p>
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
		)
} 

export default Search