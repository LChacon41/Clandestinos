import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TorneosComponent } from './torneos/torneos.component';
import { TorneosDetallesComponent } from './torneos-detalles/torneos-detalles.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BuscarComponent } from './buscar/buscar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentComponent,
    DashboardComponent,
    EstadisticasComponent,
    TorneosComponent,
    TorneosDetallesComponent,
    PerfilComponent,
    BuscarComponent,
    PageNotFoundComponent ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent},
      {path: 'estadisticas', component: EstadisticasComponent},
      {path: 'torneos', component: TorneosComponent},
      {path: 'torneos-detalles', component: TorneosDetallesComponent},
      {path: 'perfil', component: PerfilComponent},
      {path: 'buscar', component: BuscarComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
