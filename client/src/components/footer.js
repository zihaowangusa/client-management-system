import React from 'react';

const Footer = () => {
  let style = { 'margin': '10px', 'padding' : '8px', 'borderTop' : 'solid 3px #f1f2f3' }
  return(
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
       <p style={style}>&copy;&nbsp;MERN Employee Management System Designed By Zihao.</p>
    </div>
  );
}

export default Footer;