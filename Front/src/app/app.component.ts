import { Component } from '@angular/core';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titre = 'Premier projet Angular';

  genererDonneesDeTest() {
    console.log("Génération de données de test");
    // Ajoutez ici votre logique de génération de données
  }
}
