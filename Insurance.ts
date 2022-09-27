import { Claim } from "Claim";
import { Vehicle } from "Vehicle";

export class Insurance{
    policy_no: number;
    premium_amount: number;
    insurance_value: number;
    start_date: string;
    duration: number;
    claimed_status: string;
    user: string;
    vehicleIns:  Vehicle;
    claimIns: Claim;
    constructor(){
        this.vehicleIns = new Vehicle();
        this.claimIns = new Claim();
    }
    
}