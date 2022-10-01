import React from 'react';
import BreadCrumb from '../components/breadcrumb';
import Alert from 'react-bootstrap/Alert';

const CreateCampaign = () => {


    return (
        <>
            <div>
                <BreadCrumb imageURL="/asssets/images/bg_2.jpg" pagename="Create Your Campaign" pageURL="create-campaign" />
                <section class="ftco-section contact-section ftco-degree-bg">

                    <div class="container block-9">
                        <h4 class="mb-4">Create you campaign and secure funds </h4><h6>(all fields required)</h6>
                        <form id="form-create-item">
                            <div class="form-group">
                                <input type="text" class="form-control " placeholder="Name of Your Campaign" required />
                            </div>
                            <div class="form-group">
                                <textarea name="" id="" cols="30" rows="7" class="form-control" placeholder="Describe Your Campaign" required></textarea>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Number of Children to be benefited" required />
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Daily fund requirement (in USD)" required />
                            </div>

                            <div class="form-group">
                                <input type='file' multiple required />
                            </div>
                            <div class="form-group">
                                <input type="button" value="Create" class="btn btn-primary py-3 px-5" />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )

}
export default CreateCampaign