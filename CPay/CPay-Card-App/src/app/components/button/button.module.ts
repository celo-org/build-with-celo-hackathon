import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ButtonComponent } from "./button.component";

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, IonicModule],
    exports: [ButtonComponent]
})
export class ButtonModule {}