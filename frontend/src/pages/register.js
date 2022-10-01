import React, { useState } from 'react';
import BreadCrumb from '../components/breadcrumb';

const Register = () => {


    const registerOrg = () => {
        alert('sxsx');
    }

    return (
        <div>
            <BreadCrumb imageURL="/asssets/images/bg_2.jpg" pagename="Register Your Organization" pageURL="register" />
            <section class="ftco-section contact-section ftco-degree-bg">
                <div class="container block-9">
                <h4 class="mb-4">Let us know about your organisation </h4><h6>(all fields required)</h6>
                    <form id="form-create-item">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Name of Your NGO/Organization" required/>
                        </div>
                        <div class="form-group">
                            <textarea name="" id="" cols="30" rows="7" class="form-control" placeholder="Introduce your organization" required></textarea>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Enter your Government Registration Number" required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Name of the Government under whom you are registered" required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Registration Valid from (yyyy)" required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Registered Address" required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Country of Registration" required/>
                        </div>

                        <div class="form-group">
                            <input type='file' multiple required/>
                        </div>
                        <div class="form-group">
                            <input type="button" value="Register" class="btn btn-primary py-3 px-5" onClick={registerOrg}/>
                        </div>
                    </form>
                </div>
            </section>
        </div>

    )

}
export default Register