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

  headers = new Headers({'X-Mashape-Key': 'e5h5Ti877YmshUJth8KqsZOXrlC5p1n2NJDjsnFDD5UIUyjKmf'});
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

}
