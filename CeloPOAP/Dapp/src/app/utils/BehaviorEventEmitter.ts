import { BehaviorSubject } from 'rxjs';
    
export class BehaviorEventEmitter<T extends any> extends BehaviorSubject<T> {
  constructor(initial: any) {
    super(<any>(initial));
  }

  emit(value?: T) { super.next(value); }
}