export type ProductType = {
    id: number
    name: string
    description: string
    imageUrl: string
    inStock: number,
    price: number
}

export const fetchProducts = async () => {
    const products: ProductType[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`).then(res => res.json())
    return products
}

export const fetchProduct = async (id: number) => {
    const product: ProductType[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`).then(res => res.json())
    return product
}