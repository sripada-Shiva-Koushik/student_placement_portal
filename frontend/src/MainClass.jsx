import React, { useEffect } from 'react'

import Header from './Header'
import MainBanner from './MainBanner'
import Features from './Features'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './sty.css'

const MainClass = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080/verify')
            .then(result => {
                if (result.data.Status) {
                    if (result.data.role == "admin") {
                        navigate('/home')
                    } else {
                        navigate('/userdetail/' + result.data.id)
                    }
                }
            }).catch(err => console.log(err))
    }, [])
    return (
        <div>
            <>
                <Header />
                <MainBanner />
                <Features />
                <Footer />
            </>
        </div>
    )
}

export default MainClass

// import React from 'react'

// const MainClass = () => {
//     const htmlContent = `
//     <!DOCTYPE html>
// <html lang="en">

//   <head>

//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
//     <title>SCSVMV Placement Website</title>
//     <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  

//     <link rel="stylesheet" href="sty.css">

//   </head>

// <body>
//   <div id="js-preloader" class="js-preloader">
//     <div class="preloader-inner">
//       <span class="dot"></span>
//       <div class="dots">
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </div>
//   </div>
//   <header class="header-area header-sticky">
//     <div class="container">
//         <div class="row">
//             <div class="col-12">
//                 <nav class="main-nav">
//                     <a href="https://kanchiuniv.ac.in/" class="logo">
//                         <img src="assets/images/logo1.jpg" alt="" style="width: 100% ;">
//                     </a>
//                     <ul class="nav">
//                       <li><a href="index.html" class="active">Home</a></li>
//                       <li><a href="#" class="active">Dashboard</a></li>
//                       <li><a href="#" class="active">Internship</a></li>
//                       <li><a href="#" class="active">Placement</a></li>
//                       <li><a href="login_index.html">Sign out</a></li>
//                   </ul>   
//                     <a class='menu-trigger'>
//                         <span>Menu</span>
//                     </a>
//                 </nav>
//             </div>
//         </div>
//     </div>
//   </header>
//   <div class="main-banner">
//     <div class="container">
//       <div class="row">
//         <div class="col-lg-6 align-self-center">
//           <div class="caption header-text">
//             <h6>Welcome to Student Placement Portal </h6>
//             <h2>SCSVMV PLACEMENT MANAGEMENT PORTAL</h2>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div class="col-lg-4 offset-lg-2">
//           <div class="right-image">
      
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div class="features">
//     <div class="container">
//       <div class="row">
//         <div class="col-lg-3 col-md-6">
//           <a href="https://kanchiuniv.ac.in/">
//             <div class="item">
//               <div class="image" >
//                 <img src="assets/images/featured-01.png"  alt="" style="max-width: 44px;">
//               </div>
//               <h4>About College</h4>
//             </div>
//           </a>
//         </div>
//         <div class="col-lg-3 col-md-6">
//           <a href="https://kanchiuniv.ac.in/placement-division/">
//             <div class="item">
//               <div class="image">
//                 <img src="assets/images/featured-02.png" alt="" style="max-width: 44px;">
//               </div>
//               <h4>Placement Division</h4>
//             </div>
//           </a>
//         </div>
        
        
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>

//   <footer>
//     <div class="container">
//       <div class="col-lg-12">
        
//       </div>
//     </div>
//   </footer>
  

//   <script src="vendor/jquery/jquery.min.js"></script>
//   <script src="assets/js/custom.js"></script>

//   </body>
// </html>`
//     return (
//         <div>
//             <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

//         </div>
//     )
// }

// export default MainClass