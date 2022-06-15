// import { MdMenu, MdChevronLeft } from "react-icons/md"
// import { Link } from "react-router-dom"
// import { Component } from "react"
// import styles from './Home.module.css'
// // import { Pokemons } from "./Pokemons"


// export class Menu extends Component {
//     state = {
//         toggleListPokemon: false,
//     }

//     handleShowListPokemon(e) {
//         e.preventDefault()
//         this.setState(
//             {
//                 toggleListPokemon: !this.state.toggleListPokemon
//             }
//         )
        
//     }
    
    
//     render() {
//         return <>
        
//             <nav className={styles.header}>
//                 <Link to='/'>< MdChevronLeft/></Link>
//                 < MdMenu onClick={this.handleShowListPokemon.bind(this)} className={styles.menu} />
//             </nav>
//         </>
//     }
// }