import { Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { CommandsComponent } from './pages/secondary/commands/commands.component';
import { ChatComponent } from './pages/secondary/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { forceHomeRedirectGuard } from './guards/force-home-redirect.guard';
import { SolaireCommandsComponent } from './pages/secondary/solaire-commands/solaire-commands.component';
import { FacturationComponent } from './pages/secondary/facturation/facturation.component';
import { CaisseComponent } from './pages/departements/caisse/caisse.component';
import { StockComponent } from './pages/departements/stock/stock.component';
import { ProjetsComponent } from './pages/departements/projets/projets.component';
import { PrivateMessageComponent } from './pages/secondary/chat/private-message/private-message.component';
import { GroupedMessageComponent } from './pages/secondary/chat/grouped-message/grouped-message.component';
import { ProjectSectionComponent } from './pages/departements/project-section/project-section.component';

export const routes: Routes = [
    {
        path:'', component:LoginComponent
    },
    {
        path:'home', component:PrincipalComponent, children:[
            {
                path:'caisse', component:CaisseComponent,
            },
            {
                path:'projets', component:ProjectSectionComponent,
            },
            {
                path:'gravity', component:CommandsComponent,
            },
            {
                path:'solaire', component:SolaireCommandsComponent,
            },
            {
                path:'caisse', component:CaisseComponent,
            },
            {
                path:'stock', component:StockComponent,
            },
            {
                path:'chat', component:ChatComponent, children:[
                    {
                        path:'private',component:PrivateMessageComponent
                    },
                    {
                        path:'grouped',component:GroupedMessageComponent
                    }
                ]
            },
        ], canActivate:[forceHomeRedirectGuard]
    },
];
