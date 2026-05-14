
function Navbar() {
  return (
    <nav style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:"20px 40px",
      background:"#111",
      color:"white",
      position:"sticky",
      top:"0"
    }}>
      <h1>Trendy</h1>

      <div style={{display:"flex",gap:"30px"}}>
        <a href="/" style={{color:"white"}}>Home</a>
        <a href="/" style={{color:"white"}}>Products</a>
        <a href="/" style={{color:"white"}}>Contact Us</a>
      </div>

      <div style={{display:"flex",gap:"10px"}}>
        <input placeholder="Search..." />
        <button>🛒 Cart</button>
        <button>Login</button>
        <button>Register</button>
      </div>
    </nav>
  )
}

export default Navbar;
