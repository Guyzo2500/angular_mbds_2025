import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AssignmentsService } from '../shared/assignments.service';
import { Chart } from 'chart.js';
import { Assignment } from '../assignments/assignment.model';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  totalAssignments: number = 0;
  rendusPercentage: number = 0;
  averageNote: number = 0;
  nonRendusCount: number = 0;

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.assignmentsService.getAssignmentsPagines(1, 1000).subscribe(data => {
      const assignments: Assignment[] = data.docs;
      this.totalAssignments = data.totalDocs;
      
      // Calcul du pourcentage de devoirs rendus
      const rendus = assignments.filter(a => a.rendu).length;
      this.rendusPercentage = Math.round((rendus / this.totalAssignments) * 100);

      // Correction du calcul de la moyenne des notes
      const notesArray = assignments
        .filter(a => a.rendu && typeof a.note === 'number')
        .map(a => a.note as number); // Cast explicite car on a vérifié que c'est un nombre

      this.averageNote = notesArray.length > 0 
        ? notesArray.reduce((acc, curr) => acc + curr, 0) / notesArray.length 
        : 0;

      // Calcul des devoirs non rendus
      this.nonRendusCount = assignments.filter(a => !a.rendu).length;

      // Création du graphique après chargement des données
      setTimeout(() => this.createChart(assignments), 0);
    });
  }

  createChart(assignments: Assignment[]) {
    interface MatiereStats {
      [key: string]: {
        total: number;
        rendus: number;
        nonRendus: number;
      }
    }

    // Grouper les assignments par matière
    const matiereStats: MatiereStats = assignments.reduce((acc: MatiereStats, curr: Assignment) => {
      const matiere = curr.matiere;
      if (!acc[matiere]) {
        acc[matiere] = {
          total: 0,
          rendus: 0,
          nonRendus: 0
        };
      }
      acc[matiere].total++;
      if (curr.rendu) {
        acc[matiere].rendus++;
      } else {
        acc[matiere].nonRendus++;
      }
      return acc;
    }, {});

    const canvas = document.getElementById('matiereChart') as HTMLCanvasElement;
    if (canvas) {
      new Chart(canvas, {
        type: 'bar',
        data: {
          labels: Object.keys(matiereStats),
          datasets: [
            {
              label: 'Rendus',
              data: Object.values(matiereStats).map(stat => stat.rendus),
              backgroundColor: '#4caf50'
            },
            {
              label: 'Non rendus',
              data: Object.values(matiereStats).map(stat => stat.nonRendus),
              backgroundColor: '#f44336'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
