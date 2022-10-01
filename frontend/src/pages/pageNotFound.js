import React, { Component } from 'react'; 
import BreadCrumb from '../components/breadcrumb';

export default class PageNotFound extends Component {


    render() {
        return (
            <div>
                  <BreadCrumb imageURL="/asssets/images/bg_1.jpg" pagename="Page Not Found" pageURL="Error" />
            </div>
        )
    }
}