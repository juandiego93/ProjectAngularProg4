import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery'
@Component({
  selector: 'app-crud-game',
  templateUrl: './crud-game.component.html',
  styleUrls: ['./crud-game.component.css']
})
export class CrudGameComponent implements OnInit {

  idUSer: string
  allGamesForUser = []

  formNewGame: FormGroup
  formEditGame: FormGroup

  id
  formEdit = {
    name: '',
    type: '',
    desc: '',
    ageMin: 0,
    size: 0,
    platform: '',
    calification: 0,
    violence: 0
  }

  constructor(private gameService: GameService, private fbNew: FormBuilder, private fbEdit: FormBuilder) { }

  ngOnInit(): void {
    this.constructorFormNewGame()
    this.constructorFormEditGame()
    this.idUSer = localStorage.getItem('nameUser')
    this.getGameById(this.idUSer)
  }

  constructorFormNewGame() {
    this.formNewGame = this.fbNew.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      desc: ['', Validators.required],
      ageMin: ['', Validators.required],
      size: ['', Validators.required],
      platform: ['', Validators.required],
      calification: ['', Validators.required],
      violence: ['', Validators.required]
    })
  }

  constructorFormEditGame() {
    this.formEditGame = this.fbEdit.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      desc: ['', Validators.required],
      ageMin: ['', Validators.required],
      size: ['', Validators.required],
      platform: ['', Validators.required],
      calification: ['', Validators.required],
      violence: ['', Validators.required]
    })
  }

  getGameById(idUser: string) {
    this.gameService.getAllGamesByIdUser(idUser)
      .then(resp => {
        this.allGamesForUser = resp
      })
      .catch(err => {
        console.log(err)
      })
  }

  newGame() {
    console.log(this.formNewGame.value);
    const game = { ...this.formNewGame.value, idUser: this.idUSer }
    this.gameService.createNewGame(game)
      .then(resp => {
        console.log(resp);
        if (resp['status']) {
          alert(resp['message'])
          this.ngOnInit()
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  passingData(id, form_) {
    this.formEdit = form_
    this.id = id
  }

  editGame() {
    this.gameService.editGameByIdUser({ game: this.formEdit, id: this.id })
      .then(resp => {
        // this.ngOnInit()
        // $("#editGameModal").modal('hide');
      })
      .catch(err => {
        console.log(err);
      })
  }
}
