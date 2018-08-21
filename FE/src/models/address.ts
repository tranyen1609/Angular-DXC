import { Error } from './error';

export class AddressData {
    address: Address[];
    error: Error;
    constructor() {
    }
}

export class Address {
    id: number;
    addressTypeId: number;
    countryId: number;
    cityId: number;
    districtId: number;
    street: string;
    constructor(addresstypeid: number, countryid: number, cityid: number, districtid: number, st: string) {
        this.addressTypeId = addresstypeid;
        this.countryId = countryid;
        this.cityId = cityid;
        this.districtId = districtid;
        this.street = st;
    }
}