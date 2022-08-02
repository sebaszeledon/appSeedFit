import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentAllComponent } from './agent-all/agent-all.component';
import { AgentCreateComponent } from './agent-create/agent-create.component';
import { AgentUpdateComponent } from './agent-update/agent-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgentAllComponent,
    AgentCreateComponent,
    AgentUpdateComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    ReactiveFormsModule
  ]
})
export class AgentModule { }
