import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  games = [];
  genre: any;
  genreName: string = "Upcoming Games";
  favorites = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider, private storage: Storage, public loading: LoadingController) {

    let loader = this.loading.create({
      content: 'Getting Games..',
    });

    loader.present().then(() => {

      this.storage.get('genre').then((val) => {
        if (val) {
          this.genre = val.id;
          this.genreName = val.name;
        } else {
          this.genre = 5;
          this.genreName = 'Shooter';
          this.storage.set('genre', this.genre);
        }

        this._data.getGames(this.genre, 0)
          .subscribe(res => this.games = res);
      });

      this.storage.get('favorites').then((val) => {
        if (!val)
          this.storage.set('favorites', this.favorites);
        else
          this.favorites = val;
      });

      setTimeout(() => {
        loader.dismiss();
      }, 1200);

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
