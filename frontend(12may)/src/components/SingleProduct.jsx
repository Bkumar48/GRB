import React,{useState, useEffect,useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailsThumb from './DetailsThumb'
const SingleProduct = () => {
    const [product, setProduct] = useState([])
    const [index, setIndex] = useState(0)
    const { id, is_multiple_price } = useParams();
    console.log(id)

    
    
    const myRef = useRef();
    const handleTab = index =>{
        setIndex(index)
        const images = myRef.current.children;
        for(let i=0; i<images.length; i++){
            images[i].className = images[i].className.replace("active", "")
        }
        images[index].className = "active";
    }
    useEffect(() => {
        const getProduct = async () => {
            const res = await axios.get(`https://beta.getreviews.buzz/grb/api/getSingleProduct?productId=${id}&multiprice=${is_multiple_price}1&token=a51eac7d16608d804c27c6bb8c1b509dc86417be54ff3ee5dc903990ab1a352f`,{
                auth: {
                    username: 'bittu@adaired.com',
                    password: 'Ad@12345'
                }
            })
            setProduct(res.data.product)
            // console.log(res.data.product)
        }
        getProduct()
    }, [id])


    // console.log(id)

  return (
    <></>
//     <div className="app">
//     {
//       product.map(item =>(
//         <div className="details" key={item._id}>
//           <div className="big-img">
//             <img src={item.src[index]} alt=""/>
//           </div>

//           <div className="box">
//             <div className="row">
//               <h2>{item.title}</h2>
//               <span>${item.price}</span>
//             </div>
//             {/* <Colors colors={item.colors} /> */}

//             <p>{item.description}</p>
//             <p>{item.content}</p>

//             <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />
//             <button className="cart">Add to cart</button>

//           </div>
//         </div>
//       ))
//     }
//   </div>
  )
}

export default SingleProduct
