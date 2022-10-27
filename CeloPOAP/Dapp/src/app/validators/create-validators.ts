import { ValidatorFn, FormBuilder, FormGroup, Validators,ValidationErrors, AbstractControl, FormArray } from '@angular/forms';

// const CapRangeValidator: ValidatorFn = (fg: FormGroup) => {
//     const start = fg.get('softcap')?.value;
//     const end = fg.get('hardcap')?.value;
//     return start !== null && end !== null && start < end
//       ? null
//       : { range: true };
// };

const  CapRangeValidator = (fromControlName: string, toControlName: string)=> {
    return (group: FormGroup): {[key: string]: any} => {
        let f = group.controls[fromControlName];
        
        let t = group.controls[toControlName];
        if (f.value !== null && t.value !== null && f.value > t.value) {
            return {
                dates: `${fromControlName} should be less than ${toControlName}`
            };
        }
        return {};
    }
}

const ValidateDateIsNotInPast = (control: AbstractControl): {[key: string]: any} | null  => {
    if (control.value && new Date(control.value) < new Date() ) {
      return { 'past': true };
    }
    return null;
}
class ColorValidators {  

    static blue(control: AbstractControl): any | null {  
        return ColorValidators.color('blue')(control);  
    }  

    static red(control: AbstractControl): any | null {
        return ColorValidators.color('red')(control);  
    }  

    static white(control: AbstractControl): any | null {
        return ColorValidators.color('white')(control);  
    }  

    static color(colorName: string): ValidatorFn {

        return (control: AbstractControl): { [key: string]: any } | null => {
            return control.value?.toLowerCase() === colorName 
            ? null : {wrongColor: control.value};
        }
    }
}

const ValidateEndDateLaterThanStartDate = (fromControl : string, toControl : string) => {
    //ts-ignore
    return (form: FormGroup): {[key: string]: any}  => {

        const start = form.get(fromControl)?.value;

        const end = form.get(toControl)?.value;

        if (start && end) {
            
            const isRangeValid = (new Date(end).getTime() - new Date(start).getTime() > 0);

            return isRangeValid ? {} : { endDateLater:true };
        }

        return {};
    }
}

// const ValidateHardCap = () => {
//     //ts-ignore
//     return (form: FormGroup): {[key: string]: any}  => {
//         console.log('vahradcap:')
// 		const campaignType = form.get('campaignType')?.value;
//         const softCap = +form.get('softCap')?.value??0;

//         const hardCap = +form.get('hardCap')?.value??0;

//         if (campaignType && campaignType =='capped' && softCap && hardCap) {
//             const isRangeValid = hardCap > softCap  && hardCap <= (softCap *4 ) ;
//             console.log('israngevalid:',  isRangeValid)
//             return isRangeValid ? {} : { hardCapInvalid:true };
//         }

//         return {};
//     }
// }

const ValidateHardCap = (): ValidatorFn  => {

	return (control: AbstractControl): { [key: string]: any } | null => {
		
		const campaignType = control.parent?.get('campaignType')?.value;
        const softCap = +control.parent?.get('softCap')?.value??0;

        const hardCap = +control.value??0;
		
		if (campaignType && campaignType =='capped' && softCap && hardCap) {
            const isRangeValid = hardCap > softCap  && hardCap <= (softCap *4 ) ;
            
            return isRangeValid ? {} : { outOfRange:true };
        }
		
		return {};
	}
}

const ValidateVestingPercentUpto100 = (): ValidatorFn => {
    return (arr: AbstractControl): { [key: string]: any } | null => {
        if (arr instanceof FormArray) {
        
            const totalSelected = arr.controls
              .map((control) => {
                
                  if(control instanceof FormGroup){
                    return +control?.get( 'amount' )?.value??0
                  }else {
                      return 0;
                  }
              })
              .reduce((prev, next) => (next ? prev + next : prev), 0);
              
            return totalSelected == 100 ? null : { nequal100: true };
        }
    
        throw new Error('arr is not an instance of FormArray');
        
    }
  }



export {CapRangeValidator, ValidateEndDateLaterThanStartDate , ValidateDateIsNotInPast, ValidateVestingPercentUpto100, ValidateHardCap};