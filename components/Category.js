"use client"
import React, { useEffect, useState } from 'react'
import TextArea from './TextArea';

const Category = ({data, doSort, getTrueValue}) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(data);
    }, [data])
    useEffect(() => {
        if (doSort) {
            const newData = [...products].sort((a, b) => {
                return a.price - b.price;
              });
              setProducts(newData);

        } else {
            setProducts([...data]);
        }

    }, [doSort])
  return (
    <>
        {
            products?.map((product) => {
                return <tr>
                    <td>
                        {product.id}
                    </td>
                    <td>
                        {product.name}
                    </td>
                    <td>
                        {product.label}
                    </td>
                    <td>
                        <TextArea getTrueValue={getTrueValue} category={product.category} id={product.id} price={product.price}/>
                    </td>
                </tr>
            })
        }
    </>
  )
}

export default Category