import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesRoutingModule } from './recipes/recipes.routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
//import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
//import { StoreModule } from '@ngrx/store';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    RecipesRoutingModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule,
    //StoreModule.forRoot({shoppingList: shoppingListReducer}),
  ],
  
  bootstrap: [AppComponent],
  //! entryComponents: [ not support version issue!
  //!  AlertComponent
  //! ]
})
export class AppModule {}
