import React from 'react';
import BreadCrumb from '../components/breadcrumb';

const Contact = () => {


    return (
        <div>
            <BreadCrumb imageURL="/asssets/images/bg_2.jpg" pagename="Contact Us" pageURL="Contact" />
            <section class="ftco-section contact-section ftco-degree-bg">
                <div class="container">
                    <div class="row d-flex mb-5 contact-info">
                        <div class="col-md-12 mb-4">
                            <h2 class="h4">Contact Informations</h2>
                        </div>
                        <div class="w-100"></div>
                        <div class="col-md-3">
                            <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                        </div>
                        <div class="col-md-3">
                            <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                        </div>
                        <div class="col-md-3">
                            <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                        </div>
                        <div class="col-md-3">
                            <p><span>Website</span> <a href="#">yoursite.com</a></p>
                        </div>
                    </div>
                    <div class="row block-9">
                        <div class="col-md-6 pr-md-5">
                            <h4 class="mb-4">Do you have any questions?</h4>
                            <form action="#">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Your Name" />
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Your Email" />
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Subject" />
                                </div>
                                <div class="form-group">
                                    <textarea name="" id="" cols="30" rows="7" class="form-control" placeholder="Message"></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="Send Message" class="btn btn-primary py-3 px-5" />
                                </div>
                            </form>
                        </div>                         
                    </div>
                </div>
            </section>
        </div>

    )

}
export default Contact