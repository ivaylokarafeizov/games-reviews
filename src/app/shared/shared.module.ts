import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlicePipe } from './pipes/slice.pipe';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [SlicePipe, ScrollToTopComponent, LoaderComponent],
  imports: [CommonModule],
  exports: [SlicePipe, ScrollToTopComponent, LoaderComponent],
})
export class SharedModule {}
