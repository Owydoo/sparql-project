import { Component } from '@angular/core';
import { AlbumParams, ArtistParams, generateQuery } from './querygenerator/queryGenerator';
import { fetchQuery } from './querygenerator/queryDispatcher';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sparql-project';
  
  sparkqlData: string = '';

  doRequest = () => {
    console.log('hello');

    // Get data from form and get ArtistParams
    const paramsQuery: ArtistParams = new ArtistParams("Steve Jobs")

    // Generate query string from from params
    const queryString = generateQuery(paramsQuery)
  
    // Fetch data from wikidata
    fetchQuery(queryString).then((data:any) => {
      this.manageData(data)
    });
  };

  // Display the data on the screen
  manageData = (data: any) => {
    console.log(data)
    this.sparkqlData = data.results.bindings[0].person.value;
  }

}
