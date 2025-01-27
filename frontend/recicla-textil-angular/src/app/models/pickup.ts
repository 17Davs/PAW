export class Pickup {
  _id!: string;
  name!: string;
  address!: {
    street: string;
    city: string;
    postalCode: string;
  };
  active!: boolean;
}
