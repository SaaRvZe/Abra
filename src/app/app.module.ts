import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {Action, ActionReducer,  MetaReducer, StoreModule} from '@ngrx/store';
import {favoritesReducer} from "./state/favorites.reducer";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {WeatherModule} from "./modules/weather.module";
import {AppHttpInterceptor} from "./interceptor.service";
import {merge} from 'lodash-es';

export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  return function(state: S, action: A): S {
    const nextState = reducer(state, action);
    if(!state) {
      const savedState = JSON.parse(localStorage.getItem('__storage__') ?? '{}') || {};
      merge(nextState, savedState);
    }
    localStorage.setItem('__storage__', JSON.stringify(nextState))
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    WeatherModule,
    StoreModule.forRoot({favorites: favoritesReducer}, {metaReducers}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
