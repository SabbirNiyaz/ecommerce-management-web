"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

interface ProductImage {
    id: number
    filename: string
    originalName: string
    url: string
    isPrimary: boolean
    createdAt: string
    productId: number
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

const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${id}`)
            .then((res) => {
                setProduct(res.data)
                // Set primary image as default selected
                const primaryIndex = res.data.images.findIndex((img: ProductImage) => img.isPrimary)
                setSelectedImage(primaryIndex !== -1 ? primaryIndex : 0)
            })
            .catch(() => setError("Failed to load product."))
            .finally(() => setLoading(false))
    }, [id])

    if (loading)
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-gray-400 dark:text-gray-500">
                <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-sm font-medium tracking-wide">Loading product...</p>
            </div>
        )

    if (error || !product)
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
                <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <svg className="w-7 h-7 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-100">Product not found</p>
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="mt-2 px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                    Go back
                </button>
            </div>
        )

    const currentImage = product.images[selectedImage]

    return (
        <main className="max-w-5xl mx-auto px-4 py-8">

            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 mb-6 transition-colors cursor-pointer"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">

                {/* Image Gallery */}
                <div className="space-y-3">
                    {/* Main Image */}
                    <div className="w-full h-80 md:h-100 rounded-lg overflow-hidden border dark:border-gray-700 bg-gray-50 dark:bg-zinc-800">
                        {product.images.length > 0 ? (
                            <img
                                src={`${IMAGE_BASE_URL}${currentImage.url}`}
                                alt={currentImage.originalName}
                                className="w-full h-full object-cover transition-all duration-200"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No image
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {product.images.map((img, idx) => (
                                <button
                                    key={img.id}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors cursor-pointer ${selectedImage === idx
                                        ? "border-indigo-500"
                                        : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                                        }`}
                                >
                                    <img
                                        src={`${IMAGE_BASE_URL}${img.url}`}
                                        alt={img.originalName}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="space-y-2 md:space-y-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {product.name}
                        </h1>
                        {product.category && (
                            <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-2 py-0.5 rounded-full">
                                {product.category}
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-red-600">
                            ৳{parseFloat(product.price).toLocaleString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${product.status === "available"
                            ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                            : "bg-red-100 text-red-500 dark:bg-red-700 dark:text-red-100"
                            }`}>
                            {product.status}
                        </span>
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Stock: <span className="font-medium text-gray-800 dark:text-gray-200">{product.stock}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-6 md:mt-10">
                        <button className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-700 transition-colors cursor-pointer">
                            Add to Cart
                        </button>
                        <button className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}