import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms"; // <-- para ngModel
import { CommonModule } from "@angular/common"; // <-- para pipes como currency, date, keyvalue

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule, CommonModule), // <-- 👈 esto soluciona todos esos errores de plantilla
  ],
};
