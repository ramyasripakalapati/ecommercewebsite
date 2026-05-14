
const products = [
  {id:1,name:"Watch",price:"₹1499"},
  {id:2,name:"Shoes",price:"₹2299"},
  {id:3,name:"Bag",price:"₹1899"},
  {id:4,name:"Hoodie",price:"₹1799"}
]

function Products(){
  return(
    <div style={{padding:"40px"}}>
      <h1 style={{textAlign:"center"}}>Products</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",
        gap:"20px"
      }}>
        {
          products.map((item)=>(
            <div key={item.id}
              style={{
                background:"white",
                padding:"20px",
                borderRadius:"10px",
                boxShadow:"0 0 10px gray"
              }}>
              <img
                src={`https://picsum.photos/300/200?random=${item.id}`}
                alt=""
                width="100%"
              />

              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <p>⭐⭐⭐⭐☆</p>

              <button style={{
                padding:"10px",
                width:"100%",
                background:"black",
                color:"white"
              }}>
                Add To Cart
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products;
