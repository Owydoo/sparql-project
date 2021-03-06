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
export class AppComponent {
  title = 'sparql-project';
  sparkqlData: string = '';
  dataToDisplay?: ResponseCardDto[] = undefined;
  sparkqlQuery: string = '';
  isLoading: boolean = false;

  //This is the category of the last request that has been made
  lastRequestCategory: string = '';

  form = this.fb.group({
    category: ['', Validators.required],
    artistName: [''],
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
    limit: [10],
  });
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  logForm = () => {
    console.log(this.form.value);
  };

  doRequest = (paramsQuery: Params) => {
    console.log('hello');
    this.isLoading = true;

    // Generate query string from from params
    const queryString = generateQuery(paramsQuery);
    this.sparkqlQuery = queryString;

    // Fetch data from wikidata
    fetchQuery(queryString).then((data: any) => {
      this.manageData(data);
      this.isLoading = false;
    });
  };

  /**
   * depending on string value, returns a boolean or undefined which
   * works with the SPARQL query we want to send to wikidata.
   * @param stringStatus
   * @returns true, false or undefined
   */
  getArtistStatus = (stringStatus: string | undefined) => {
    if (stringStatus == 'Dead') {
      return true;
    } else if (stringStatus == 'Alive') {
      return false;
    } else if (stringStatus == 'Ignore') {
      return undefined;
    }
    return undefined;
  };

  onSubmit = () => {
    this.dataToDisplay = undefined;

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
      var artistAlbum =
        formValue.artistAlbum != '' ? formValue.artistAlbum : undefined;
      var artistTrack =
        formValue.artistTrack != '' ? formValue.artistTrack : undefined;
      var artistlimit = formValue.limit != null ? formValue.limit : undefined;

      var paramsArtistQuery: ArtistParams = new ArtistParams(
        artistName,
        artistIsDead,
        artistCountry,
        artistInstrument,
        artistLabel,
        artistGenre,
        artistAlbum,
        artistTrack,
        artistlimit
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
      var albumlimit = formValue.limit != null ? formValue.limit : undefined;

      var paramsAlbumQuery: AlbumParams = new AlbumParams(
        albumName,
        albumGenre,
        albumArtistName,
        albumTrack,
        albumLabel,
        albumlimit
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
      var tracklimit = formValue.limit != null ? formValue.limit : undefined;

      var paramsTrackQuery: TrackParams = new TrackParams(
        trackName,
        trackGenre,
        trackArtistName,
        trackAlbum,
        trackLabel,
        tracklimit,
      );

      this.doRequest(paramsTrackQuery);
    }

    this.lastRequestCategory = formValue.category;
  };

  // Display the data on the screen
  manageData = (data: any) => {
    console.log(data);
    if (this.lastRequestCategory == 'Artist') {
      this.dataToDisplay = data.results.bindings.map(this.artistToDTO);
      console.log(this.dataToDisplay);
    } else if (this.lastRequestCategory == 'Album') {
      this.dataToDisplay = data.results.bindings.map(this.albumToDTO);
      console.log(this.dataToDisplay);
    } else if (this.lastRequestCategory == 'Track') {
      this.dataToDisplay = data.results.bindings.map(this.trackToDTO);
      console.log(this.dataToDisplay);
    }
  };

  artistToDTO = (data: any): ResponseCardDto => {
    var dto: ResponseCardDto = {
      name: data.personLabel.value,
      link: data.person.value,
      description: data.description.value,
      image: data.image?.value,
    };
    return dto;
  };

  albumToDTO = (data: any): ResponseCardDto => {
    var dto: ResponseCardDto = {
      name: data.albumLabel.value,
      link: data.album.value,
      description: data.description.value,
      image: data.image?.value,
    };
    return dto;
  };

  trackToDTO = (data: any): ResponseCardDto => {
    var dto: ResponseCardDto = {
      name: data.trackLabel?.value,
      link: data.track?.value,
      description: data.description?.value,
      image: data.image?.value,
    };
    return dto;
  };
}
