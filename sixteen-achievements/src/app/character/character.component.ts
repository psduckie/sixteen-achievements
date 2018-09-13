import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})

export class CharacterComponent implements OnInit {
  factions: string[] = ['Exile', 'Dominion'];
  classes: string[] = ['Warrior', 'Spellslinger', 'Medic', 'Stalker', 'Esper', 'Engineer'];

  constructor() { }

  ngOnInit() {
  }

}
