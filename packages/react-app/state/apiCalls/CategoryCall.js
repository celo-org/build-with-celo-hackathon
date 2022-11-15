import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'

const CategoryCall = () => {

    const [categories, setCategories] = useState();

        useEffect(() => {

            const getCategories = async() =>{
                const res = await axios.get("http://127.0.0.1:8080/api/categories");
                console.log(res.data)
                setCategories(res.data)
            }
            getCategories()
        }, [categories])            

  return (
    <div>{categories}</div>
  )
}

export default CategoryCall