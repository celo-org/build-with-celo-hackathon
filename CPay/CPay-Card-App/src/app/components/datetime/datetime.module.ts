import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { DatetimeComponent } from "./datetime.component";

@NgModule({
    declarations: [DatetimeComponent],
    imports: [CommonModule, IonicModule],
    exports: [DatetimeComponent]
})
export class InputModule {}