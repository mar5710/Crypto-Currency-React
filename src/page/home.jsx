import styles from "./home.module.scss"
import { API_URL } from "../configs"
import { useState,useEffect } from "react"
import axios from "axios"
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'

export default function Home(){
   const [data,setData] = useState([])

   const renderChangePercent = (num,val) =>{
      if(num > 0){
         return <td style={{ color: 'green' }}>{val}%</td>
      }else if(num < 0){
         return <td style={{ color: 'red' }}>{val}%</td>
      }else{
         return <td>{val}%</td>
      }
   }

   useEffect(() =>{
      (async () =>{
         try{
            const response = await axios.get(API_URL)
            const result = await response.data
            setData(result	)
         }catch(e){
            console.log(e);
         }
      })()
   },[])

   const [page, setPage] = useState(0)
	const [filterData, setFilterData] = useState()
	const n = 10

   useEffect(() => {
		setFilterData(
			data.filter((item,index) => {
				return (index >= page * n) & (index < (page + 1) * n)
			})
         
		)
	}, [page,data])



   return (
			<main className={styles.homeMain}>
				<section>
					<div className={styles.cryptoContainer}>
						<div className={styles.cryptoListName}>
								<div>Logo</div>
								<div>Name</div>
								<div>Price</div>
								<div>24h</div>
						</div>
						<hr />
						<div className={styles.cryptoListItems}>
							{filterData &&
								filterData.map((item, index) => {
									return (
										<div className={styles.cryptoItem} key={index}>
											<Link to={item.id}>
												<div>
													<img
														src={item.image}
														alt={item.name}
														width={40}
														height={40}
													/>
												</div>
												<div>{item.name}</div>
												<div>{item.current_price}</div>
												{renderChangePercent(
													item.market_cap_change_percentage_24h,
													item.price_change_percentage_24h
												)}
											</Link>
										</div>
									)
								})}
						</div>
					</div>
					<ReactPaginate
						containerClassName={styles.pagination}
						pageClassName={styles.pageItem}
						activeClassName={styles.active}
						onPageChange={event => setPage(event.selected)}
						pageCount={Math.ceil(data.length / n)}
						breakLabel='...'
						previousLabel={
							<IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
								<AiFillLeftCircle />
							</IconContext.Provider>
						}
						nextLabel={
							<IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
								<AiFillRightCircle />
							</IconContext.Provider>
						}
					/>
				</section>
			</main>
		)
}