import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../../components/user/context/CartContext.jsx';


export default function ProductDetails() {

const { productId } = useParams();
const navigate = useNavigate();
const {cartCount,setCartCount} = useContext(CartContext);

    const [product, setProduct] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
  
    const getProducts = async () => {
  
      try {
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
        setProduct(data.product);
      }
  
      catch (error) {
        console.log(error);
      }
  
      finally {
        setIsLoading(false);
      }
    }

    const addProductToCart = async () => {
  
      try {

        const token = localStorage.getItem("userToken");
        const response = await axios.post('https://ecommerce-node4.onrender.com/cart',

          {
            productId:productId
          },
          {
            headers:{
              Authorization: `Tariq__${token}`,
            }
          }
        );

        if (response.status == 201) {
          toast.info('Product added succesfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
          setCartCount(cartCount+1);
          navigate('/cart');
        }

      }
  
      catch (error) {
        console.log("error",error);
      }
    }

    useEffect(() => {
      getProducts();
    }, [])
  
    if (isLoading) {
      return <h2>Loading...</h2>
    }


  return (
    
    <section className='product'>
    
    <Card>
      <Card.Img variant="top" src={product.mainImage.secure_url} className='w-25' />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
        {product.description}

        <Button onClick={addProductToCart} className='btn btn-primary'> Add to cart</Button>
        </Card.Text>
      </Card.Body>
    </Card>

  </section>



  )
}
