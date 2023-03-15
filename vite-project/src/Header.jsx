import { CartContext } from "./CartContext"
import { useContext } from "react"
import cartFull from './assets/cartFull.png'
import cartEmpty from './assets/cartEmpty.png'

export default function Header(){
    const [cart] = useContext(CartContext)
    console.log(cart)

    return(
        <div className="flex justify-between">
            <h1 className="text-2xl">Whastapp Vendor Store</h1>

            <img src={cart.length ? cartFull : cartEmpty} alt="" />

        </div>
    )
}
