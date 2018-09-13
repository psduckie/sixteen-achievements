import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Achievement } from '../achievement';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  achievements: Achievement[] = [];
  @Input() faction: string;

  fileURL: string;

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

  ngOnInit() {
  }

  rollAchievements() {
    if (this.faction === null || this.faction === undefined) {
      return;
    } else if (this.faction === 'Exile') {
      this.fileURL = '../../assets/achievements-e.csv';
    } else { // Dominion
      this.fileURL = '../../assets/achievements-d.csv';
    }

    this.http.get(this.fileURL).subscribe(data => this.extractAchievementData(data));
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
      const counter = 0;
      this.extractAchievementDataRecurse(allTextLines, currentLine, counter, randomResult);
    }
  }

  extractAchievementDataRecurse(allTextLines, currentLine, counter, randomResult) {
    do {
      currentLine = allTextLines[counter].split(',');
      if (currentLine[0] !== randomResult) {
        counter++;
      }
    } while (currentLine[0] !== randomResult);

    for (let i = this.achievements.length - 1; i >= 0; i--) {
      if (this.achievements[i].index === this.achievements[randomResult].index) {
        randomResult = Math.floor(Math.random() * allTextLines.length);
        this.extractAchievementDataRecurse(allTextLines, currentLine, counter, randomResult);
      } else {
        break;
      }
    }

    this.achievements[this.achievements.length] = {
      'index': currentLine[0],
      'name': currentLine[1],
      'category': currentLine[2],
      'tier': currentLine[3]
    };
  }
}
