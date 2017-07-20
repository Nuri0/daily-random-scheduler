import {NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ChoiceGroupDetailComponent} from "./choice-group-detail/choice-group-detail.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "choice-group-detail/:id",
    component: ChoiceGroupDetailComponent
  },
  {
    // default route
    path: '',
    redirectTo: "/dashboard",
    pathMatch: "full"
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const RoutedComponents = [DashboardComponent]
