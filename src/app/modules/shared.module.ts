import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule(
  {
    imports: [FormsModule,
      HttpClientModule,
      BrowserAnimationsModule]
  }
)
export class SharedModule { }
