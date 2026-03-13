import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
import { environment } from './environments/environment.development';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

async function loadUsers() {

  const response = await fetch(environment.apiUrl + '/movies');
  const data = await response.json();

  console.log(data);
}

loadUsers();