import { Chance } from 'chance';

const chance = new Chance();

export class UserData {
  getData() {
    return {
      standardUserName: 'standard_user',
      standardUserPassword: 'secret_sauce',
      firstName: chance.name(),
      lastName: chance.last(),
      postalCode: chance.postal()
    };
  }
}
