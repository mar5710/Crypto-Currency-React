import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './singleProduct.module.scss'
import { getCurrencyURL } from '../../configs'

export default function SingleProduct() {
	const { id } = useParams()

	const [post, setPost] = useState()
	useEffect(() => {
		
		(async () => {
			const response = await axios.get(getCurrencyURL(id))
			const result = response.data

			setPost(result)
		})()
	},[id])



	const renderChangePercent = (num, val) => {
		if (num > 0) {
			return <td style={{ color: 'green' }}>{val}%</td>
		} else if (num < 0) {
			return <td style={{ color: 'red' }}>{val}%</td>
		} else {
			return <td>{val}%</td>
		}
	}


	return (
		<main className={styles.main}>
			<section className={styles.postContainer}>
				{post && post.map((item,index) =>{
					return (
						<div key={index} className={styles.productContainer}>
							<div className={styles.productImg}>
								{console.log(post)}
								<img
									src={item.image}
									alt={item.name}
									width={300}
									height={300}
								/>
							</div>
							<div className={styles.productItems}>
								<h2>{item.name}</h2>
								<p>Price: {item.current_price} USD</p>
								<span>
									{renderChangePercent(
										item.market_cap_change_percentage_24h,
										item.price_change_percentage_24h
									)}{' '}
								</span>
							</div>
						</div>
					)
				})}
			</section>
		</main>
	)
}
