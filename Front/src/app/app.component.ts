import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  titre = 'Premier projet Angular';
  roleConnecte = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.roleConnecte = this.authService.getRoleConnecte();
  }

  deconnexion() {
    this.authService.logout();
    this.roleConnecte = '';
    window.location.href = '/login';
  }

  genererDonneesDeTest() {
    console.log("Génération de données de test");
    // Ajoutez ici votre logique de génération de données
  }
}
