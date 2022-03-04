import { Component, Input, OnInit } from '@angular/core';
import { Params } from 'src/app/querygenerator/queryGenerator';
import { ResponseCardDto } from 'src/app/utilities/ResponseCardDto';

@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.scss']
})
export class ResponseCardComponent implements OnInit {

  @Input()
  content:ResponseCardDto = {}

  @Input()
  category:string = ""

  exampleContent:ResponseCardDto = {
    name: "exampleName",
    link:"https://www.wikidata.org/wiki/Q48187",
    image:"https://material.angular.io/assets/img/examples/shiba2.jpg",
    description: "C'est un petit toutou",
  };

  cardContent:ResponseCardDto = {
    name: "",
    description: "",
    image: "",
    link:"",
  }

  isExample:boolean = false;

  constructor() { }

  ngOnInit() {
    this.cardContent.name = this.content.name;
    this.cardContent.link = this.content.link;
    this.cardContent.image = this.content.image;
    this.cardContent.description = this.content.description;

    console.log("content in response card", JSON.stringify(this.content) );
    
    console.log("card content ", this.cardContent);
    
  }


}
