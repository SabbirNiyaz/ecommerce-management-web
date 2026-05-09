// "use client"

// import { useEffect } from "react"
// import axios from "axios"

// const getProducts = async () => {
//     try {
//         const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`
//         )
//         console.log("Fetched products:", response.data)
//         return response.data
//     } catch (error) {
//         console.error("Error fetching products:", error)
//         throw error
//     }
// }

// export default function Page() {
//     useEffect(() => {
//         getProducts()
//     }, [])

//     return <div>Check console</div>
// }