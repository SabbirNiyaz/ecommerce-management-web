import EditProductForm from "@/components/editProduct-Form"

type Props = {
    params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {

    const { id } = await params

    // console.log("PAGE PARAMS ID:", id)

    return (
        <div>
            <EditProductForm id={id} />
        </div>
    )
}