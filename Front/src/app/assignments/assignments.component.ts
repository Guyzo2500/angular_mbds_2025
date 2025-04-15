import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AssignmentsService } from '../shared/assignments.service';
import { Router, RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';

// Interface pour la réponse paginée
interface PaginatedResponse {
  docs: Assignment[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RenduDirective,
    NonRenduDirective,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink,
    MatChipsModule,
    MatIconModule,
    MatSliderModule,
    RouterModule
  ]
})

export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  assignments = new MatTableDataSource<Assignment>([]);

  // Pour la pagination
  page = 1;
  limit = 40;
  totalDocs = 0;
  totalPages = 0;
  pagingCounter = 1;
  hasPrevPage = false;
  hasNextPage = false;
  prevPage: number | null = null;
  nextPage: number | null = null;
  // Pour la data table angular
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu', 'auteur', 'matiere', 'note', 'remarques'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Attention, pour l'injection de service, mettre en private !!! Sinon
  // ça ne marche pas
  constructor(private assignementsService: AssignmentsService,
              private router: Router) {}

  ngOnInit() {
    console.log("ngOnInit appelé lors de l'instanciation du composant");

    // On récupère les assignments depuis le service
    this.getAssignments();

    /*
    // on veut passer la propriété ajoutActive à true au bout de 3 secondes
    setTimeout(() => {
      this.ajoutActive = true;
    }, 3000);
    */
  }

  getAssignments() {
    this.assignementsService.getAssignmentsPagines(this.page, this.limit)
      .subscribe((data: PaginatedResponse) => {
        this.assignments.data = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.pagingCounter = data.pagingCounter;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.prevPage = data.prevPage;
        this.nextPage = data.nextPage;

        console.log("Données reçues dans le subscribe");
      });
    console.log("APRES L'APPEL AU SERVICE");
  }

  pageSuivante() {
    if(this.hasNextPage && this.nextPage) {
      this.page = this.nextPage;
      this.getAssignments();
    }
  }

  pagePrecedente() {
    if(this.hasPrevPage && this.prevPage) {
      this.page = this.prevPage;
      this.getAssignments();
    }
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }
  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  // Pour le composant material paginator
  onPageEvent(event: any) {
    console.log(event);
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignments();
  }

  getColor(a: any): string {
    if (a.rendu) return 'green';
    else
      return 'red';
  }

  afficheDetail(row: any) {
    console.log(row);
    // On récupère l'id de l'assignment situé dans la colonne _id de la ligne
    // sélectionnée
    let id = row._id;
    // et on utilise le routeur pour afficher le détail de l'assignment
    this.router.navigate(['/assignments', id]);
  }
}
