import { Component, OnInit } from '@angular/core';
import { generateQuery, Params } from './querygenerator/queryGenerator';
import { fetchQuery } from './querygenerator/queryDispatcher';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDto } from './utilities/formDto';
import { ArtistParams } from './querygenerator/artist/ArtistParams';
import { AlbumParams } from './querygenerator/album/AlbumParams';
import { TrackParams } from './querygenerator/track/TrackParams';
import { ResponseCardDto } from './utilities/ResponseCardDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  title = 'sparql-project';
  sparkqlData: string = '';
  dataToDisplay: ResponseCardDto[] = [];
  sparkqlQuery: string = '';

  //This is the category of the last request that has been made
  lastRequestCategory: string = '';

  form = this.fb.group({
    category: ['', Validators.required],
    artistName: ['Eric Clapton'],
    artistGenre: [''],
    artistInstrument: [''],
    artistLabel: [''],
    artistCountry: [''],
    artistAlbum: [''],
    artistTrack: [''],
    artistStatus: ['Ignore', Validators.required],
    albumName: [''],
    albumGenre: [''],
    albumArtistName: [''],
    albumLabel: [''],
    albumTrack: [''],
    trackName: [''],
    trackGenre: [''],
    trackAlbumName: [''],
    trackArtistName: [''],
    trackTypeOfTrack: [''],
    trackLabel: [''],
    
  });
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  logForm = () => {
    console.log(this.form.value);
  };

  doRequest = (paramsQuery: Params) => {
    console.log('hello'); 

    // Generate query string from from params
    const queryString = generateQuery(paramsQuery);
    this.sparkqlQuery = queryString;

    // Fetch data from wikidata
    fetchQuery(queryString).then((data: any) => {
      this.manageData(data);
    });
  };

  /**
   * depending on string value, returns a boolean or undefined which
   * works with the SPARQL query we want to send to wikidata.
   * @param stringStatus 
   * @returns true, false or undefined
   */
  getArtistStatus = (stringStatus:string|undefined) => {
    if (stringStatus == "Dead") {
      return true;
    }
    else if (stringStatus == "Alive") {
      return false;
    }
    else if (stringStatus == "Ignore") {
      return undefined;
    }
    return undefined;
  }

  onSubmit = () => {
    var formValue: FormDto = this.form.value;
    console.log('on submit : ', formValue);

    if (formValue.category == 'Artist') {
      var artistName =
        formValue.artistName != '' ? formValue.artistName : undefined;
      var artistIsDead = this.getArtistStatus(formValue.artistStatus);
      var artistCountry =
        formValue.artistCountry != '' ? formValue.artistCountry : undefined;
      var artistInstrument =
        formValue.artistInstrument != ''
          ? formValue.artistInstrument
          : undefined;
      var artistLabel =
        formValue.artistLabel != '' ? formValue.artistLabel : undefined;
      var artistGenre =
        formValue.artistGenre != '' ? formValue.artistGenre : undefined;
      var artistAlbum = formValue.artistAlbum != '' ? formValue.artistAlbum : undefined;
      var artistTrack = formValue.artistTrack != '' ? formValue.artistTrack : undefined;

      var paramsArtistQuery: ArtistParams = new ArtistParams(
        artistName,
        artistIsDead,
        artistCountry,
        artistInstrument,
        artistLabel,
        artistGenre,
        artistAlbum,
        artistTrack
      );

      this.doRequest(paramsArtistQuery);
    } else if (formValue.category == 'Album') {
      var albumName =
        formValue.albumName != '' ? formValue.albumName : undefined;
      var albumGenre =
        formValue.albumGenre != '' ? formValue.albumGenre : undefined;
      var albumArtistName =
        formValue.albumArtistName != '' ? formValue.albumArtistName : undefined;
      var albumTrack =
        formValue.albumTrack != '' ? formValue.albumTrack : undefined;
      var albumLabel =
        formValue.albumLabel != '' ? formValue.albumLabel : undefined;

      var paramsAlbumQuery: AlbumParams = new AlbumParams(
        albumName,
        albumGenre,
        albumArtistName,
        albumTrack,
        albumLabel
      );

      this.doRequest(paramsAlbumQuery);
    } else if (formValue.category == 'Track') {
      var trackName =
        formValue.trackName != '' ? formValue.trackName : undefined;
      var trackGenre =
        formValue.trackGenre != '' ? formValue.trackGenre : undefined;
      var trackArtistName =
        formValue.trackArtistName != '' ? formValue.trackArtistName : undefined;
      var trackAlbum =
        formValue.trackAlbumName != '' ? formValue.trackAlbumName : undefined;
      var trackLabel =
        formValue.trackLabel != '' ? formValue.trackLabel : undefined;

      var paramsTrackQuery: TrackParams = new TrackParams(
        trackName,
        trackGenre,
        trackArtistName,
        trackAlbum,
        trackLabel
      );

      this.doRequest(paramsTrackQuery);
    }

    this.lastRequestCategory = formValue.category;
  };

  // Display the data on the screen
  manageData = (data: any) => {
    console.log(data);
    var formValue: FormDto = this.form.value;

    if (this.lastRequestCategory == "Artist") {
      this.sparkqlData = data.results.bindings[0].person.value;
      this.dataToDisplay = data.results.bindings.map(this.artistToDTO)
      console.log(this.dataToDisplay)
    }
    else if (this.lastRequestCategory == "Album") {
      
      this.sparkqlData = data.results.bindings[0].album.value;
    }
    else if (this.lastRequestCategory == "Track"){

      this.sparkqlData = data.results.bindings[0].track.value;
    }

  };


   artistToDTO = (data:any): ResponseCardDto => {

    var dto : ResponseCardDto = {
      name: data.personLabel.value,
      link: data.person.value,
      description: data.description.value,
      image: data.image.value
    }
    return dto

  }
}



