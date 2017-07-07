import { Component, trigger,state,style,transition,animate,keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  animations: [

    trigger('fadeIn', [
      transition('void => *', [
        animate('600ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-70px)', offset: 0}),
          style({ opacity: 1, transform: 'translateY(25px)', offset: .75}),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1}),
        ]))
      ])
    ]),

    trigger('fadeUp', [
      transition('void => *', [
        animate('900ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(70px)', offset: 0}),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1}),
        ]))
      ])
    ])
  ]
})
export class DetailsPage {

  game_id: number;
  game: object;
  perspective: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider, private iab: InAppBrowser, private youtube: YoutubeVideoPlayer) {
  
    this.game_id = navParams.get("game");

  }

  ionViewDidLoad() {
    this._data.getGame(this.game_id)
      .subscribe(res => {

        this._data.getPerspective(res[0].player_perspectives[0])
          .subscribe(res => this.perspective = res[0]);

        this.game = res[0];

      });
  }

  launchSite(url) {
    const browser = this.iab.create(url, '_system');
    browser.close();
  }

  playVideo(video_id) {
    this.youtube.openVideo(video_id);
  }

}
