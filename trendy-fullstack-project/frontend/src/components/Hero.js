
function Hero(){
  return(
    <div style={{
      height:"400px",
      backgroundImage:"url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200')",
      backgroundSize:"cover",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      color:"white",
      flexDirection:"column"
    }}>
      <h1 style={{fontSize:"60px"}}>SUMMER SALE 50% OFF</h1>
      <button style={{
        padding:"15px 30px",
        background:"orange",
        border:"none",
        color:"white"
      }}>
        Shop Now
      </button>
    </div>
  )
}

export default Hero;
