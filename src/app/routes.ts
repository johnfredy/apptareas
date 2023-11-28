import {Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {DetailsComponent} from './component/details/details.component';

const routeConfig: Routes = [
  { path: '', component: HomeComponent, title: 'Home page' },
  { path: 'details/:id', component: DetailsComponent, title: 'Home details' },
];
export default routeConfig;