export default function ProductDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Product ID: {params.id}</h1>
            <p>This is the product detail page.</p>
        </div>
    )
}