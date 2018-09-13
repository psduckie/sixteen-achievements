import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Achievement } from './achievement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public faction: string;

  title = 'sixteen-achievements';

  factions: string[] = ['Exile', 'Dominion'];
  classes: string[] = ['Warrior', 'Spellslinger', 'Medic', 'Stalker', 'Esper', 'Engineer'];
  races: string[] = [];
  paths: string[] = ['Explorer', 'Scientist', 'Soldier', 'Settler'];
  achievements: Achievement[] = [];

  selectedFaction: string;
  selectedClass: string;
  selectedRace: string;
  selectedPath: string;

  matrixURL = '../../assets/class-matrix.csv';
  achieveURL: string;

  constructor(private http: Http) {
    for (let i = 0; i <= 15; i++) {
      this.achievements.push({
        'index': null,
        'name': 'Achievement ' + (i + 1),
        'category': 'Testing',
        'tier': null
      });
    }
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

  rollAchievements() {
    if (this.selectedFaction === null || this.selectedFaction === undefined) {
      return;
    } else if (this.selectedFaction === 'Exile') {
      this.achieveURL = '../../assets/achievements-e.csv';
    } else { // Dominion
      this.achieveURL = '../../assets/achievements-d.csv';
    }

    this.http.get(this.achieveURL).subscribe(data => this.extractAchievementData(data));
  }

  extractAchievementData(res: Response) {
    const csvData = res['_body'] || '';
    const allTextLines = csvData.split(/\r\n|\n/);
    // tslint:disable-next-line:prefer-const (variable is changed, despite what TSLint says)
    let currentLine;
    let randomResult;

    this.achievements = [];

    for (let i = 0; i < 16; i++) {
      randomResult = Math.floor(Math.random() * allTextLines.length);
      this.extractAchievementDataRecurse(allTextLines, currentLine, randomResult);
    }
  }

  extractAchievementDataRecurse(allTextLines, currentLine, randomResult) {
    console.log(allTextLines);
    let counter = 0;
    do {
      currentLine = allTextLines[counter].split(',');
      console.log(currentLine);
      console.log(currentLine[0] * 1);
      if (currentLine[0] * 1 !== randomResult) {
        counter++;
      }
    } while (currentLine[0] * 1 !== randomResult);

/*    for (let i = this.achievements.length - 1; i >= 0; i--) {
      if (this.achievements[i].index === this.achievements[randomResult].index) {
        randomResult = Math.floor(Math.random() * allTextLines.length);
        this.extractAchievementDataRecurse(allTextLines, currentLine, randomResult);
      } else {
        break;
      }
    }*/

    this.achievements[this.achievements.length] = {
      'index': currentLine[0],
      'name': currentLine[1],
      'category': currentLine[2],
      'tier': currentLine[3]
    };
  }
}
