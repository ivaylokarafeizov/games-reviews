import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlicePipe } from './pipes/slice.pipe';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthErrorDisplayComponent } from './auth-error-display/auth-error-display.component';

@NgModule({
  declarations: [
    SlicePipe,
    ScrollToTopComponent,
    LoaderComponent,
    AuthErrorDisplayComponent,
  ],
  imports: [CommonModule],
  exports: [
    SlicePipe,
    ScrollToTopComponent,
    LoaderComponent,
    AuthErrorDisplayComponent,
  ],
})
export class SharedModule {}
