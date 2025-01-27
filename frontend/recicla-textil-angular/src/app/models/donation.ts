import { Donor } from './donor';
import { Entity } from './entity';
import { Pickup } from './pickup';
import { Status } from './status';

export class Donation {
  _id!: string;
  donor!: Donor;
  pickupPoint?: Pickup;
  receivingEntity!: Entity;
  quantity!: number;
  weight!: number;
  status!: Status;
  points!: number;
  photoProof?: {
    image: string;
    by: string;
    date: Date;
  };
}
