export class Assignment {
    _id!:string;
    nom!:string;
    dateDeRendu!:Date;
    rendu!:boolean;
    // Nouvelles propriétés
    auteur!: string;
    matiere!: string;
    imageMatiere!: string;
    prof!: string;
    note?: number;
    remarques?: string;
}