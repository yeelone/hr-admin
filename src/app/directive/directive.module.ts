import { NgModule } from "@angular/core";
import { CanAccessDirective } from './can-access.directive';

@NgModule({
  imports: [
    ],
  declarations: [
      CanAccessDirective
  ],
  exports: [
    CanAccessDirective
   ],
})
export class CustomDirectiveModule { }