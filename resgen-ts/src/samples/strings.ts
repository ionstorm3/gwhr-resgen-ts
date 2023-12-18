import {IStrings} from './iStrings'; 

export class Strings implements IStrings {
	public get fName(): string {
		return "First Name";
	}

	public get lName(): string {
		return "Last Name";
	}
}