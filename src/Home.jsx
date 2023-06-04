import './App.css';

function App(){
    return(
        <div>
    <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>


    <div className="container-fluid bg-dark px-5 d-none d-lg-block">
        <div className="row gx-0">
            <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
                <div className="d-inline-flex align-items-center" style="height: 45px;">
                    <small className="me-3 text-light"><i className="fa fa-map-marker-alt me-2"></i>123 Street, New York, USA</small>
                    <small className="me-3 text-light"><i className="fa fa-phone-alt me-2"></i>+012 345 6789</small>
                    <small className="text-light"><i className="fa fa-envelope-open me-2"></i>info@example.com</small>
                </div>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
                <div className="d-inline-flex align-items-center" style="height: 45px;">
                    <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-twitter fw-normal"></i></a>
                    <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-facebook-f fw-normal"></i></a>
                    <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-linkedin-in fw-normal"></i></a>
                    <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-instagram fw-normal"></i></a>
                    <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle" href=""><i className="fab fa-youtube fw-normal"></i></a>
                </div>
            </div>
        </div>
    </div>

    <div className="container-fluid position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <a href="" className="navbar-brand p-0"/>
                <h1 className="text-primary m-0"><i className="fa fa-map-marker-alt me-3"></i>PATNA</h1>
                <img src="img/logo.png" alt="Logo"/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
                    <a href="index.html" className="nav-item nav-link active">Home</a>
                    <a href="about.html" className="nav-item nav-link">About</a>
                    <a href="service.html" className="nav-item nav-link">Services</a>
                    <a href="testimonial.html" className="nav-item nav-link">Testimonial</a>
                    <a href="team.html" className="nav-item nav-link">Our Team</a>
                    <a href="portfolio.html" className="nav-item nav-link">Portfolio</a>
                    <a href="package.html" className="nav-item nav-link">Packages</a>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                        <div className="dropdown-menu m-0">
                            <a href="destination.html" className="dropdown-item">Destination</a>
                            <a href="booking.html" className="dropdown-item">Booking</a>
                            <a href="team.html" className="dropdown-item">Travel Guides</a>
                            <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                            <a href="404.html" className="dropdown-item">404 Page</a>
                        </div>
                    </div>
                </div>
                <a href="" className="btn btn-primary rounded-pill py-2 px-4">Contact Us</a>
            </div>
        </nav>

        <div className="container-fluid bg-primary py-5 mb-5 hero-header">
            <div className="container py-5">
                <div className="row justify-content-center py-5">
                    <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">Likhavat Printing Press</h1>
                        <p className="fs-4 text-white mb-4 animated slideInDown">Since 2002</p>
                        <div className="position-relative w-75 mx-auto animated slideInDown">
                            <input className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="Eg: Thailand"/>
                            <button type="button" className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2" style="margin-top: 7px;">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     Navbar & Hero End 


     About Start 
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style="min-height: 400px;">
                    <div className="position-relative h-100">
                        <img className="img-fluid position-absolute w-100 h-100" src="img/mummy.jpg" alt="" style="object-fit: cover;"/>
                    </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                    <h6 className="section-title bg-white text-start text-primary pe-3">About Us</h6>
                    <h1 className="mb-4">Welcome to <span className="text-primary">Likhavat Printing Press</span></h1>
                    <p className="mb-4">Welcome to our printing press business, where we transform your ideas into captivating printed materials. With state-of-the-art technology and a skilled team, we offer a wide range of printing services for businesses and individuals alike. From business cards to brochures, flyers to posters, we deliver exceptional quality and vibrant colors that make your brand stand out.</p>
                    <p className="mb-4">Our commitment to precision and efficiency ensures quick turnaround times without compromising on excellence. With personalized customer service, competitive pricing, and eco-friendly practices, we are your reliable partner for all your printing needs. Experience the power of print with our printing press business today.</p>
                    <div className="row gy-2 gx-4 mb-4">
                        <div className="col-sm-6">
                            <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>First className Print Quality</p>
                        </div>
                        <div className="col-sm-6">
                            <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Quality Assuarance</p>
                        </div>
                        <div className="col-sm-6">
                            <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Most Affordable</p>
                        </div>
                        <div className="col-sm-6">
                            <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Delivery All Over India</p>
                        </div>
                        <div className="col-sm-6">
                            <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Kuch btao or</p>
                        </div>
                        <div className="col-sm-6">
                            <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>24/7 Service</p>
                        </div>
                    </div>
                    <a className="btn btn-primary py-3 px-5 mt-2" href="">Read More</a>
                </div>
            </div>
        </div>
    </div>
     About End 


     Service Start 
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3">Services</h6>
                <h1 className="mb-5">Our Services</h1>
            </div>
            <div className="row g-4">
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                            <h5>Offset Printing</h5>
                            <p>Description about it</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                            <h5>Visiting Card Printing</h5>
                            <p>Description about it</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-user text-primary mb-4"></i>
                            <h5>Letter Head Printing</h5>
                            <p>Description about it</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-cog text-primary mb-4"></i>
                            <h5>Merchandise Printing</h5>
                            <p>Description about it</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                            <h5>Manual Printing</h5>
                            <p>Description about it</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                            <h5>Pamplet Printing</h5>
                            <p>Description about it</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-user text-primary mb-4"></i>
                            <h5>Book Printing</h5>
                            <p>Description about it</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-cog text-primary mb-4"></i>
                            <h5>Cloth Printing</h5>
                            <p>Description about it</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     Service End 


     Destination Start 
    <div className="container-xxl py-5 destination">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3">Our Work</h6>
                <h1 className="mb-5">Our Popular Services</h1>
            </div>
            <div className="row g-3">
                <div className="col-lg-7 col-md-6">
                    <div className="row g-3">
                        <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                            <a className="position-relative d-block overflow-hidden" href=""/>
                                <img className="img-fluid" src="img/work1.jpg" alt=""/>
                                <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">1080x720px</div>
                                <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Banner</div>
                        </div>
                        <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                            <a className="position-relative d-block overflow-hidden" href=""/>
                                <img className="img-fluid" src="img/work2.jpg" alt=""/>
                                <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">480x720px</div>
                                <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Flex</div>
                        </div>
                        <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                            <a className="position-relative d-block overflow-hidden" href="">
                                <img className="img-fluid" src="img/work3.jpg" alt=""/>
                                <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">390x480px</div>
                                <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Flex Board</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s" style="min-height: 350px;">
                    <a className="position-relative d-block h-100 overflow-hidden" href=""/>
                        <img className="img-fluid position-absolute w-100 h-100" src="img/work8.jpg" alt="" style="object-fit: cover;"/>
                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">720x1080px</div>
                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Star Banner</div>
                </div>
            </div>
        </div>
    </div>
    
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3">Packages</h6>
                <h1 className="mb-5">Awesome Packages</h1>
            </div>
            <div className="row g-4 justify-content-center">
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="package-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/package-1.jpg" alt=""/>
                        </div>
                        <div className="d-flex border-bottom">
                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-map-marker-alt text-primary me-2"></i>Thailand</small>
                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt text-primary me-2"></i>3 days</small>
                            <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2"></i>2 Person</small>
                        </div>
                        <div className="text-center p-4">
                            <h3 className="mb-0">$149.00</h3>
                            <div className="mb-3">
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                            </div>
                            <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos</p>
                            <div className="d-flex justify-content-center mb-2">
                                <a href="#" className="btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px 0 0 30px;">Read More</a>
                                <a href="#" className="btn btn-sm btn-primary px-3" style="border-radius: 0 30px 30px 0;">Book Now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="package-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/package-2.jpg" alt=""/>
                        <div className="d-flex border-bottom">
                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-map-marker-alt text-primary me-2"></i>Indonesia</small>
                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt text-primary me-2"></i>3 days</small>
                            <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2"></i>2 Person</small>
                        </div>
                        <div className="text-center p-4">
                            <h3 className="mb-0">$139.00</h3>
                            <div className="mb-3">
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                            </div>
                            <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos</p>
                            <div className="d-flex justify-content-center mb-2">
                                <a href="#" className="btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px 0 0 30px;">Read More</a>
                                <a href="#" className="btn btn-sm btn-primary px-3" style="border-radius: 0 30px 30px 0;">Book Now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="package-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/package-3.jpg" alt=""/>
                        </div>
                        <div className="d-flex border-bottom">
                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-map-marker-alt text-primary me-2"></i>Malaysia</small>
                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt text-primary me-2"></i>3 days</small>
                            <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2"></i>2 Person</small>
                        </div>
                        <div className="text-center p-4">
                            <h3 className="mb-0">$189.00</h3>
                            <div className="mb-3">
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                            </div>
                            <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos</p>
                            <div className="d-flex justify-content-center mb-2">
                                <a href="#" className="btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px 0 0 30px;">Read More</a>
                                <a href="#" className="btn btn-sm btn-primary px-3" style="border-radius: 0 30px 30px 0;">Book Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     Package End 


     Booking Start 
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
            <div className="booking p-5">
                <div className="row g-5 align-items-center">
                    <div className="col-md-6 text-white">
                        <h6 className="text-white text-uppercase">Booking</h6>
                        <h1 className="text-white mb-4">Online Booking</h1>
                        <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                        <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                        <a className="btn btn-outline-light py-3 px-5 mt-2" href="">Read More</a>
                    </div>
                    <div className="col-md-6">
                        <h1 className="text-white mb-4">Book A Tour</h1>
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control bg-transparent" id="name" placeholder="Your Name"/>
                                        <label for="name">Your Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="email" className="form-control bg-transparent" id="email" placeholder="Your Email"/>
                                        <label for="email">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating date" id="date3" data-target-input="nearest">
                                        <input type="text" className="form-control bg-transparent datetimepicker-input" id="datetime" placeholder="Date & Time" data-target="#date3" data-toggle="datetimepicker" />
                                        <label for="datetime">Date & Time</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <select className="form-select bg-transparent" id="select1">
                                            <option value="1">Destination 1</option>
                                            <option value="2">Destination 2</option>
                                            <option value="3">Destination 3</option>
                                        </select>
                                        <label for="select1">Destination</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control bg-transparent" placeholder="Special Request" id="message" style="height: 100px"></textarea>
                                        <label for="message">Special Request</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-outline-light w-100 py-3" type="submit">Book Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3">Process</h6>
                <h1 className="mb-5">3 Easy Steps</h1>
            </div>
            <div className="row gy-5 gx-4 justify-content-center">
                <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                        <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow" style="width: 100px; height: 100px;">
                            <i className="fa fa-globe fa-3x text-white"></i>
                        </div>
                        <h5 className="mt-4">Describe your design</h5>
                        <hr className="w-25 mx-auto bg-primary mb-1"/>
                        <hr className="w-50 mx-auto bg-primary mt-0"/>
                        <p className="mb-0">Let us know about your idea about the product looks and allow us to design a prototype that suits your ideological desire.</p>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                        <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow" style="width: 100px; height: 100px;">
                            <i className="fa fa-dollar-sign fa-3x text-white"></i>
                        </div>
                        <h5 className="mt-4">Confirm And Pay</h5>
                        <hr className="w-25 mx-auto bg-primary mb-1"/>
                        <hr className="w-50 mx-auto bg-primary mt-0"/>
                        <p className="mb-0">Confirm the design and matter that suits your desire the best, make the payment either online or offline.</p>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                        <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow" style="width: 100px; height: 100px;">
                            <i className="fa fa-plane fa-3x text-white"></i>
                        </div>
                        <h5 className="mt-4">Grab It Or Get It Delivered</h5>
                        <hr className="w-25 mx-auto bg-primary mb-1"/>
                        <hr className="w-50 mx-auto bg-primary mt-0"/>
                        <p className="mb-0">Get your order by visiting our shop or let us know your address where we will be delivering your oder to you.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3">Employees</h6>
                <h1 className="mb-5">Meet Our Team Members</h1>
            </div>
            <div className="row g-4">
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="team-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/team-1.jpg" alt=""/>
                        </div>
                        <div className="position-relative d-flex justify-content-center" style="margin-top: -19px;">
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-0">Satyendra Kumar</h5>
                            <small>Founder And Managing Director</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="team-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/team-2.jpg" alt=""/>
                        </div>
                        <div className="position-relative d-flex justify-content-center" style="margin-top: -19px;">
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-0">Sushma Devi</h5>
                            <small>Chief Executive Director</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="team-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/team-3.jpg" alt=""/>
                        </div>
                        <div className="position-relative d-flex justify-content-center" style="margin-top: -19px;">
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-0">Raj Anand</h5>
                            <small>Operator</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div className="team-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/team-4.jpg" alt=""/>
                        </div>
                        <div className="position-relative d-flex justify-content-center" style="margin-top: -19px;">
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-0">Gautam Anand</h5>
                            <small>Operator</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="team-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/team-2.jpg" alt=""/>
                        </div>
                        <div className="position-relative d-flex justify-content-center" style="margin-top: -19px;">
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-0">Gaurav Anand</h5>
                            <small>Devilvery Operations</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="team-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/team-3.jpg" alt=""/>
                        </div>
                        <div className="position-relative d-flex justify-content-center" style="margin-top: -19px;">
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-0">Aman Singh</h5>
                            <small>Marketing</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="team-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/team-4.jpg" alt=""/>
                        </div>
                        <div className="position-relative d-flex justify-content-center" style="margin-top: -19px;">
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-0">Abhinash Anand</h5>
                            <small>Designer</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div className="team-item">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="img/team-1.jpg" alt=""/>
                        </div>
                        <div className="position-relative d-flex justify-content-center" style="margin-top: -19px;">
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-0">Anjali Singh</h5>
                            <small>Quality Assurance</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     Team End 


     Testimonial Start 
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
            <div className="text-center">
                <h6 className="section-title bg-white text-center text-primary px-3">Testimonial</h6>
                <h1 className="mb-5">Our Clients Say!!!</h1>
            </div>
            <div className="owl-carousel testimonial-carousel position-relative">
                <div className="testimonial-item bg-white text-center border p-4">
                    <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-1.jpg" style="width: 80px; height: 80px;"/>
                    <h5 className="mb-0">Awedhesh Kumar Ojha</h5>
                    <p>Boring Road, Patna</p>
                    <p className="mb-0">Had a very good experience in terms of quality of printing, consultation, pricing and delivery commitments.</p>
                </div>
                <div className="testimonial-item bg-white text-center border p-4">
                    <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-2.jpg" style="width: 80px; height: 80px;"/>
                    <h5 className="mb-0">Sushma Devi</h5>
                    <p>Mainpura, Patna</p>
                    <p className="mt-2 mb-0">Had a very good experience in terms of quality of printing, consultation, pricing and delivery commitments.</p>
                </div>
                <div className="testimonial-item bg-white text-center border p-4">
                    <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-3.jpg" style="width: 80px; height: 80px;"/>
                    <h5 className="mb-0">Raj Anand</h5>
                    <p>Sampat Chak, Patna</p>
                    <p className="mt-2 mb-0">Had a very good experience in terms of quality of printing, consultation, pricing and delivery commitments.</p>
                </div>
                <div className="testimonial-item bg-white text-center border p-4">
                    <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-4.jpg" style="width: 80px; height: 80px;"/>
                    <h5 className="mb-0">Gautam Anand</h5>
                    <p>Raja Bazar, Patna</p>
                    <p className="mt-2 mb-0">Had a very good experience in terms of quality of printing, consultation, pricing and delivery commitments.</p>
                </div>
            </div>
        </div>
    </div>
   
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-white mb-3">Likhavat Printing Press</h4>
                    <a className="btn btn-link" href="">About Us</a>
                    <a className="btn btn-link" href="">Contact Us</a>
                    <a className="btn btn-link" href="">Privacy Policy</a>
                    <a className="btn btn-link" href="">Terms & Condition</a>
                    <a className="btn btn-link" href="">FAQs & Help</a>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-white mb-3">Contact</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Boring Raod, Patna, Bihar - 800001</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>9308592381</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>rudra.org1@gmail.com</p>
                    <div className="d-flex pt-2">
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-white mb-3">Gallery</h4>
                    <div className="row g-2 pt-2">
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="img/package-1.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="img/package-2.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="img/package-3.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="img/package-2.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="img/package-3.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="img/package-1.jpg" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-white mb-3">Newsletter</h4>
                    <p>Get in touch with for updates on new products and services.</p>
                    <div className="position-relative mx-auto" style="max-width: 400px;">
                        <input className="form-control border-primary w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                        <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a className="border-bottom" href="#">Likhavat Printing Press</a>, All Right Reserved.

                        /*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/
                        Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <div className="footer-menu">
                            <a href="">Home</a>
                            <a href="">Cookies</a>
                            <a href="">Help</a>
                            <a href="">FQAs</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
    <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>


    {/* <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lib/wow/wow.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="lib/tempusdominus/js/moment.min.js"></script>
    <script src="lib/tempusdominus/js/moment-timezone.min.js"></script>
    <script src="lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>

    <script src="js/main.js"></script> */}
</div></div>
    )
}