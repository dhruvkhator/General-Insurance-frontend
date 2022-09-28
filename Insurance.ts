import { Claim } from "Claim";
import { Vehicle } from "Vehicle";

export class Insurance{
    policy_no: number;
    premium_amount: number;
    insurance_value: number;
    total_claimed_amount: number;
    start_date: string;
    duration: number;
    claim_status: string;
    user: string;
    vehicleIns:  Vehicle;
    claimIns: Claim;
    constructor(){
        this.vehicleIns = new Vehicle();
        this.claimIns = new Claim();
    }
    
}