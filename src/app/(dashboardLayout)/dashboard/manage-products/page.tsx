"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

type ProductStatus = "available" | "draft" | "out_of_stock"

interface Product {
  id: string
  name: string
  stock: number
  status: ProductStatus
}

interface PaginatedResponse {
  data: Product[]
  total: number
  page: number
  lastPage: number
}

const getProducts = async (page: number, limit: number = 15): Promise<PaginatedResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`,
      { params: { page, limit } }
    )
    const data = response.data
    return {
      data: Array.isArray(data) ? data : data.data ?? [],
      total: data.total ?? 0,
      page: data.page ?? page,
      lastPage: data.lastPage ?? 1,
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { data: [], total: 0, page: 1, lastPage: 1 }
  }
}

const StatusBadge = ({ status }: { status: ProductStatus }) => {
  const styles: Record<ProductStatus, string> = {
    available: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
    draft: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    out_of_stock: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
  }
  const labels: Record<ProductStatus, string> = {
    available: "Available",
    draft: "Draft",
    out_of_stock: "Out of stock",
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const LIMIT = 15

  useEffect(() => {
    setLoading(true)
    getProducts(page, LIMIT)
      .then((res) => {
        setProducts(res.data)
        setLastPage(res.lastPage)
        setTotal(res.total)
      })
      .finally(() => setLoading(false))
  }, [page])

  const filtered = products.filter((p) => {
    const matchQ =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
    const matchS = !statusFilter || p.status === statusFilter
    return matchQ && matchS
  })

  const counts = {
    total,
    available: products.filter((p) => p.status === "available").length,
    out_of_stock: products.filter((p) => p.status === "out_of_stock").length,
    draft: products.filter((p) => p.status === "draft").length,
  }

  return (
    <div className="p-0 w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-0.5 dark:text-gray-400">Inventory</p>
          <h1 className="text-2xl font-medium dark:text-gray-100">Manage Products</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total products", value: counts.total, color: "" },
          { label: "Available", value: counts.available, color: "text-green-600 dark:text-green-400" },
          { label: "Out of stock", value: counts.out_of_stock, color: "text-red-600 dark:text-red-400" },
          { label: "Draft", value: counts.draft, color: "text-gray-400 dark:text-gray-500" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-4 dark:bg-gray-900">
            <p className="text-xs text-gray-500 mb-1 dark:text-gray-400">{s.label}</p>
            <p className={`text-2xl font-medium dark:text-gray-100 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-600"
        >
          <option value="">All status</option>
          <option value="available">Available</option>
          <option value="draft">Draft</option>
          <option value="out_of_stock">Out of stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden dark:border-gray-800">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
              {["ID", "Product", "Stock", "Status", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide last:text-right dark:text-gray-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-15 text-center text-gray-400 text-sm dark:text-gray-500">
                  Loading products…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-15 text-center text-gray-400 text-sm dark:text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-0 hover:bg-gray-50 transition dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-400 dark:text-gray-500">{p.id}</td>
                  <td className="px-4 py-3 font-medium dark:text-gray-200">{p.name}</td>
                  <td className={`px-4 py-3 dark:text-gray-300 ${p.stock === 0 ? "text-red-500 dark:text-red-400" : ""}`}>
                    {p.stock} units
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">

                      <Link href={`/dashboard/manage-products/${p.id}`}>
                        <button className="px-8 py-2 border border-orange-200 text-yellow-500 rounded text-xs 
                      hover:bg-yellow-400 hover:text-white transition cursor-pointer dark:border-orange-900 dark:text-yellow-400 dark:hover:bg-yellow-600">
                          Edit
                        </button>
                      </Link>

                      <button className="px-8 py-2 border border-red-200 text-red-500 rounded text-xs 
                      hover:bg-red-600 hover:text-white transition cursor-pointer dark:border-red-900 dark:text-red-400 dark:hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {lastPage > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Page {page} of {lastPage} · {total} products
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm rounded-md border disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-gray-100 transition-colors cursor-pointer dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              ← Prev
            </button>

            {Array.from({ length: lastPage }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === lastPage || Math.abs(p - page) <= 1)
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...")
                acc.push(p)
                return acc
              }, [])
              .map((item, idx) =>
                item === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 dark:text-gray-500">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setPage(item as number)}
                    className={`px-3 py-1.5 text-sm rounded-md border transition-colors cursor-pointer ${page === item
                      ? "bg-gray-900 text-white border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100"
                      : "hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={page === lastPage}
              className="px-3 py-1.5 text-sm rounded-md border disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-gray-100 transition-colors cursor-pointer dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}