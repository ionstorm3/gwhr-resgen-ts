import {IStrings} from './IStrings'; 

export class Strings implements IStrings {
	public get fName(): string {
		return "first Name";
	}

	public get lName(): string {
		return "last Name";
	}

	public get msgHelO(): string {
		return " greg's msg 32$^&-jk_l@109";
	}
}