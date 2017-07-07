import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {

  headers = new Headers({'X-Mashape-Key': '0hnjJtX6OUmshq2ucGxNL3NmF4yzp1WlVMwjsn9He6fCPf2byz'});
  options = new RequestOptions({ headers: this.headers });
  limit:number = 50;

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  getGames(genre, offset_num) {

    let genre_id = genre;
    let offset = offset_num;

    return this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,release_dates,screenshots&limit='+this.limit+'&offset='+offset+'&order=release_dates.date:desc&filter[genres][eq]='+genre_id+'&filter[screenshots][exists]', this.options)
      .map(response => response.json());

  }

  getFavorites(favs) {

    let favorites = favs;
    favorites = favorites.join();

    return this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/games/'+favorites+'?fields=name,release_dates,screenshots&order=release_dates.date:desc&filter[screenshots][exists]', this.options)
      .map(response => response.json());
  }

  getGenres(genre) {
    let genre_id = genre;

    return this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/genres/'+genre_id+'?fields=*', this.options)
      .map(response => response.json());
  }

  getGame(game) {
    let game_id = game;

    return this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/games/'+game_id+'?fields=*', this.options)
      .map(response => response.json());
  }

  getPerspective(perspective) {
    let persp_id = perspective;

    return this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/player_perspectives/'+persp_id+'?fields=*', this.options)
      .map(response => response.json());

  }

  searchGames(kw) {

    let keyword = kw;

    return this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,release_dates,screenshots&limit='+this.limit+'&offset=0&order=release_dates.date:desc&search='+keyword, this.options)
      .map(response => response.json());

  }

}
