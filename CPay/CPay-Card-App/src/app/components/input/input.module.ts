import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { InputComponent } from "./input.component";

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, IonicModule],
    exports: [InputComponent]
})
export class InputModule {}