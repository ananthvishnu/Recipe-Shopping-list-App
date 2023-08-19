import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingComponent } from "./loading/loading.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropDownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingComponent,
        PlaceholderDirective,
        DropDownDirective
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports:[
        AlertComponent,
        LoadingComponent,
        PlaceholderDirective,
        DropDownDirective,
        CommonModule
    ]
})
export class SharedModule {}