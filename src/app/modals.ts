import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Modals {
  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification() {
    Swal.fire({
      title: 'Succesful',
      text: 'Succesfully reported, your report will be reviewed',
      icon: 'success',
      confirmButtonColor: '#1C9E5D',
      confirmButtonText: 'OK',
    });
  }

  customSuccessNotification(message: string) {
    Swal.fire({
      title: 'Succesful',
      text: message,
      icon: 'success',
      confirmButtonColor: '#1C9E5D',
      confirmButtonText: 'OK',
    });
  }

  errorNotification(message: string) {
    /*Swal.fire('Cant report', message, 'error');*/
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonColor: 'red',
      confirmButtonText: 'OK',
    });
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }
}
