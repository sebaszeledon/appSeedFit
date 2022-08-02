import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentAllComponent } from './agent-all/agent-all.component';
import { AgentCreateComponent } from './agent-create/agent-create.component';
import { AgentUpdateComponent } from './agent-update/agent-update.component';

const routes: Routes = [
  { path: 'agente', component: AgentAllComponent },
  { path: 'agente/create', component: AgentCreateComponent },
  { path: 'agente/update/:id', component: AgentUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
