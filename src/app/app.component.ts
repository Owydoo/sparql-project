import { Component } from '@angular/core';
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
  form = this.fb.group({
    category: ['', Validators.required],
    artistName: [''],
    artistGenre: [''],
    albumName: [''],
    albumGenre: [''],
    albumArtistName: [''],
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

    let headers: any = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
    });

    let params = new HttpParams();
    params = params.append(
      'query',
      'SELECT DISTINCT ?picture ?country WHERE { ?country dbo:capital ?capital. ?capital rdfs:label "Beijing" @en. ?capital foaf:depiction ?picture  } LIMIT 15'
    );
    params = params.append('format', 'json');

    this.http
      .get('http://dbpedia.org/sparql', { headers: headers, params: params })
      .subscribe((data: any) => {
        // console.log("data object : ",data.results.bindings);
        // console.log("data object", data);
        console.log('data test', data.results.bindings[0].picture.value);
        this.sparkqlData = data.results.bindings[0].picture.value;

        // this.sparkqlData = data.results.toString(); // 3
      });
    console.log(this.sparkqlData); // 2
  };
}
