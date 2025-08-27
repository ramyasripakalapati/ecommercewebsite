import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        width: '100%',           // full width like navbar
        backgroundColor: '#343a40',
        color: 'white',
        textAlign: 'center',
        padding: '15px 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          E-Commerce &copy; {new Date().getFullYear()}
        </p>
        <p style={{ margin: 0 }}>
          Contact: support@ecommerce.com | Phone: +91 1234567890
        </p>
        <p style={{ margin: 0 }}>
          <a href="#" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
