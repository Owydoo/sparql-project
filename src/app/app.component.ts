import { Component } from '@angular/core';
import { AlbumParams, ArtistParams, generateQuery } from './querygenerator/queryGenerator';
import { fetchQuery } from './querygenerator/queryDispatcher';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sparql-project';
  sparkqlData: string = '';
  sparkqlQuery: string = '';
  form = this.fb.group({
    category: ['', Validators.required],
    artistName: [''],
    artistGenre: [''],
    artistInstrument: [''],
    artistLabel: [''],
    albumName: [''],
    albumGenre: [''],
    albumArtistName: [''],
    albumLabel:[''],
    albumTrack:[''],
    trackName: [''],
    trackAlbumName: [''],
    trackArtistName: [''],
    trackTypeOfTrack: [''],
  });
  constructor(private http: HttpClient, private fb: FormBuilder) {}


  logForm = () => {
    console.log(this.form.value);
  };

  doRequest = () => {
    console.log('hello');

    // Get data from form and get ArtistParams
    const paramsQuery: ArtistParams = new ArtistParams("Mark Knopfler", false, "United Kingdom")

    // Generate query string from from params
    const queryString = generateQuery(paramsQuery)
    this.sparkqlQuery = queryString
  
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
