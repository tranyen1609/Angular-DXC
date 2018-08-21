import {Component, Input} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AddressService } from '../../../services/address/address.service'

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './addressDetails.modal.html'
})
export class NgbdModalBasic {
  closeResult: string;

  @Input() modalUDId: number;
  info: object;

  get in(): any {
    return this.modalUDId;
  }

  constructor(private modalService: NgbModal, private data: AddressService) {}

  getUserAddressOfId() {
    this.data.getUserAddressFromId(this.modalUDId).subscribe(
      result => {
        console.log(this.modalUDId);
        console.log(result);
      }
    );
  }
  
  open(content) {
    console.log(this.modalUDId);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}