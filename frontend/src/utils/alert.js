import React, { Component } from 'react';
import Swal from 'sweetalert2';

class SweetAlertComponent extends Component {
    // comment on types to be passed/
    // 1 for success
    // 2 for info
    // 3 for error



    gettype = (type) => {
        switch (type) {
            case 1:
                return "success";
            case 2:
                return "info";
            case 3:
                return "error";
            default:
                return "info";
        }
    }


    showAlert = (type, text, title = "") => {
        Swal.fire({
            title: type === 3 ? 'Error!' : title,
            text: text,
            icon: this.gettype(type),
        });
    };
}

export default SweetAlertComponent;