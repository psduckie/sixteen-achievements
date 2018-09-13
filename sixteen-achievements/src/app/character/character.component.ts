import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})

export class CharacterComponent implements OnInit {
  factions: string[] = ['Exile', 'Dominion'];
  classes: string[] = ['Warrior', 'Spellslinger', 'Medic', 'Stalker', 'Esper', 'Engineer'];
  races: string[] = [];
  paths: string[] = ['Explorer', 'Scientist', 'Soldier', 'Settler'];

  selectedFaction: string;
  selectedClass: string;
  selectedRace: string;
  selectedPath: string;

  matrixURL = '../../assets/class-matrix.csv';

  constructor(private http: Http) { }

  ngOnInit() {
  }

  calculateRaces() {
    if (this.selectedFaction === undefined || this.selectedClass === undefined) {
      return;
    }

    this.http.get(this.matrixURL).subscribe(data => this.extractRaceData(data));
  }

  extractRaceData(res: Response) {
    const csvData = res['_body'] || '';
    const allTextLines = csvData.split(/\r\n|\n/);
    let currentLine;

    this.races = [];

    let counter = 0;
    do {
      currentLine = allTextLines[counter].split(',');
      if (currentLine[0] !== this.selectedClass) {
        counter++;
      }
    } while (currentLine[0] !== this.selectedClass);

    if (this.selectedFaction === 'Exile') {
      if (currentLine[1] === 'Yes') {
        this.races.push('Human');
      }
      if (currentLine[2] === 'Yes') {
        this.races.push('Granok');
      }
      if (currentLine[3] === 'Yes') {
        this.races.push('Aurin');
      }
      if (currentLine[4] === 'Yes') {
        this.races.push('Mordesh');
      }
    } else {
      if (currentLine[5] === 'Yes') {
        this.races.push('Cassian');
      }
      if (currentLine[6] === 'Yes') {
        this.races.push('Draken');
      }
      if (currentLine[7] === 'Yes') {
        this.races.push('Mechari');
      }
      if (currentLine[8] === 'Yes') {
        this.races.push('Chua');
      }
    }
  }

  rollFaction() {
    const index = Math.floor(Math.random() * this.factions.length);
    this.selectedFaction = this.factions[index];
    this.calculateRaces();
  }
  rollClass() {
    const index = Math.floor(Math.random() * this.classes.length);
    this.selectedClass = this.classes[index];
    this.calculateRaces();
  }
  rollRace() {
    const index = Math.floor(Math.random() * this.races.length);
    this.selectedRace = this.races[index];
  }
  rollPath() {
    const index = Math.floor(Math.random() * this.paths.length);
    this.selectedPath = this.paths[index];
  }
}
