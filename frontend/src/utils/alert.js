import { Component } from 'react';
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


    showAlert = (type, text, page, title = "") => {
        Swal.fire({
            title: type === 3 ? 'Error!' : title,
            text: text,
            icon: this.gettype(type),
        }).then((result) => {
            if (result.isConfirmed) {
                    window.location.href = `${page}`
            }
        });
    };

    showSweetAlert = (type, text, title ) => {
        Swal.fire({
            position: "top-end",
            icon: this.gettype(type),
            text: text,
            title: type === 3 ? 'Error!' : title,
            showConfirmButton: false,
            timer: 2000
        });
    };

    deleteModal = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-primary"
        },
        buttonsStyling: false
    });

    
    showDeleteModal = ({title, text, icon, object, deleteCallback}) => {
        this.deleteModal.fire({
                title: title,
                text: text,
                icon: icon,
                showCancelButton: true,
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                reverseButtons: true,
            }
            ).then((result) => {
                if (result.isConfirmed) {
                    deleteCallback();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${object} has been deleted.`,
                        icon: "success",
                    });
                }
            });
    }
}

export const showAlert = (type, text, title) => {
    const component = new SweetAlertComponent();
    component.showSweetAlert(type, text, title);
};

export const showDeleteDialog = (
    {
       title = "Are you sure?",
       text = "You won't be able to revert this!",
       icon = "warning",
       object = 'User',
       deleteCallback = () => {}
   }
) => {
    const component = new SweetAlertComponent();
    component.showDeleteModal({title: title, text: text, icon: icon, object: object, deleteCallback: deleteCallback});
}
export default SweetAlertComponent;