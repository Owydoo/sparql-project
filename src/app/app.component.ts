import { Component } from '@angular/core';
import { generateQuery } from './querygenerator/queryGenerator';
import { fetchQuery } from './querygenerator/queryDispatcher';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDto } from './utilities/formDto';
import { ArtistParams } from './querygenerator/artist/ArtistParams';
import { AlbumParams } from './querygenerator/album/AlbumParams';

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
    artistCountry: [''],
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

  doRequest = (paramsQuery:any) => {
    console.log('hello');

    // Get data from form and get ArtistParams
    // const paramsQuery: ArtistParams = new ArtistParams("Mark Knopfler", false, "United Kingdom")

    // Generate query string from from params
    const queryString = generateQuery(paramsQuery)
    this.sparkqlQuery = queryString
  
    // Fetch data from wikidata
    fetchQuery(queryString).then((data:any) => {
      this.manageData(data)
    });
  };

  onSubmit = () => {

    var formValue: FormDto = this.form.value;
    console.log("on submit : ", formValue);

    if (formValue.category == "Artist") {
      var artistName = formValue.artistName != '' ? formValue.artistName : undefined;  
      var artistIsDead = undefined;
      var artistCountry = formValue.artistCountry != '' ? formValue.artistCountry : undefined;
      var artistInstrument = formValue.artistInstrument != '' ? formValue.artistInstrument : undefined;
      var artistLabel = undefined;
      var artistGenre = formValue.artistGenre != '' ? formValue.artistGenre : undefined;
      var artistAlbum = undefined;
      var artistTrack = undefined;

      var paramsQuery: ArtistParams = new ArtistParams(artistName, artistIsDead, artistCountry,artistInstrument,artistLabel ,artistGenre, artistAlbum, artistTrack)
      this.doRequest(paramsQuery);
    }


  }

  // Display the data on the screen
  manageData = (data: any) => {
    console.log(data)
    this.sparkqlData = data.results.bindings[0].person.value;
  }

}
