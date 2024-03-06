import Head from "next/head";
import ProductDetails from "@/components/ProductDetails";
// import { ProductType, fetchProducts, fetchProduct } from "@/services/products";
import { fetchProduct, fetchProducts, ProductType } from "../../../src/services/products";
import Header from "@/components/Header";

import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { ReactNode } from "react";
import { Container } from "reactstrap";

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id
  
    if (typeof id === 'string') {
      const product = await fetchProduct(id)
  
      return { props: { product }, revalidate: 10  }
    }
  
    return { redirect: { destination: '/products', permanent: false } }
  }
  

  export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetchProducts()
  
    const paths = products.map(product => {
      return { params: { id: product.id.toString() } }
    })
  
    return { paths, fallback: false }
  }

  const Product: NextPage = (props: {
    children?: ReactNode  
    product?: ProductType
  }) => {
    return (
      <div>
        <Head>
          <title>{props.product!.name}</title>
          <meta name="description" content={props.product!.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <Header />
  
        <Container className="mt-5">
          <ProductDetails product={props.product!} />
        </Container>
      </div>
    )
  }
  
  export default Product