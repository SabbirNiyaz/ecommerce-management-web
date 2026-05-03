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
"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface ProductImage {
    id: number
    filename: string
    originalName: string
}

interface Product {
    id: number
    name: string
    description: string
    price: string
    status: "available" | "unavailable"
    stock: number
    category?: string
    images: ProductImage[]
}

//! API Call
const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`
        )
        return response.data
    } catch (error) {
        console.error("Error fetching products:", error)
        throw error
    }
}

const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/images/`

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(() => setError("Failed to load products."))
            .finally(() => setLoading(false))
    }, [])

    const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean) as string[])]

    const filtered = products.filter((p) => {
        const matchesSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        const matchesCategory =
            selectedCategory === "All" || p.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    if (loading)
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-gray-400 dark:text-gray-500">
                <svg
                    className="animate-spin h-8 w-8 text-indigo-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
                <p className="text-sm font-medium tracking-wide">Loading products...</p>
            </div>
        )

    if (error)
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
                <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <svg
                        className="w-7 h-7 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                    </svg>
                </div>
                <div>
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-100">Something went wrong</p>
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors
                    cursor-pointer dark:bg-indigo-600 dark:hover:bg-indigo-700"
                >
                    Try again
                </button>
            </div>
        )

    return (
        <main className="max-w-6xl mx-auto px-2 py-4">
            <h1 className="text-xl font-bold mb-6">Products ({filtered.length})</h1>

            {/* Search + Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400
                        dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                    />
                </div>

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white
                    dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm mt-1">Try a different search or category</p>
                    <button
                        onClick={() => { setSearch(""); setSelectedCategory("All") }}
                        className="mt-4 text-indigo-600 text-sm underline hover:text-indigo-800
                        dark:text-grey-100 dark:hover:text-grey-400"
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filtered.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900"
                    >
                        {product.images.length > 0 ? (
                            <img
                                src={`${IMAGE_BASE_URL}${product.images[0].filename}`}
                                alt={product.images[0].originalName}
                                className="w-full h-58 object-cover"
                            />
                        ) : (
                            <div className="w-full h-58 bg-gray-100 flex items-center justify-center text-gray-400 dark:bg-zinc-800">
                                No image
                            </div>
                        )}

                        <div className="p-4 space-y-2">
                            <div className="flex items-center">
                                <h2 className="font-semibold text-md">{product.name}</h2>
                            </div>

                            <div>
                                {product.category && (
                                    <span className="inline-block text-xs bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full">
                                        {product.category}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="text-md font-bold">
                                    ৳{parseFloat(product.price).toLocaleString()}
                                </span>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full font-medium ${product.status === "available"
                                        ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                                        : "bg-red-100 text-red-500 dark:bg-red-700 dark:text-red-100"
                                        }`}
                                >
                                    {product.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}