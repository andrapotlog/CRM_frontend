import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {TruncatePipe} from "./pipes/truncate.pipe";
import {StatusTransformPipe} from "./pipes/status-transform.pipe";
import {PriorityTransformPipe} from "./pipes/priority-transform.pipe";

@NgModule({
  declarations: [TruncatePipe, StatusTransformPipe, PriorityTransformPipe, PriorityTransformPipe],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TruncatePipe, PriorityTransformPipe, StatusTransformPipe],
})
export class SharedModule {}
