import styles from "./Header.module.scss"
import { Link } from "react-router-dom"
import Search from "../Search/Search"


const Header = () =>{
   return(
      <header>
         <div className={styles.logo}>
            <Link to={"/"}>
               <img src="/images/logo.png" alt="logo" width={100} height={50} />
            </Link>
         </div>
         <div className={styles.searchBox}>
            <Search/>
         </div>
      </header>
   )
}

export default Header