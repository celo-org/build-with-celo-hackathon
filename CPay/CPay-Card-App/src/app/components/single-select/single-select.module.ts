import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { SingleSelectComponent } from "./single-select.component";

@NgModule({
    declarations: [SingleSelectComponent],
    imports: [CommonModule, IonicModule],
    exports: [SingleSelectComponent]
})
export class InputModule {}