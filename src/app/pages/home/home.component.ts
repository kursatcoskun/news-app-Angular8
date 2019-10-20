import { Component, OnInit } from '@angular/core';
import noUiSlider from 'nouislider';
import { NewsService } from 'src/services/news.service';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  newsHeaderName : string = null;
  news:any;
  constructor(private newsService:NewsService, private dataService: DataService,
    private router: Router, private spinner: NgxSpinnerService) {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');

    var slider = document.getElementById('sliderRegular');

    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById('sliderDouble');

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }

  getDateNow() {
    const today = new Date().toISOString().slice(0, 10)
    return today;
  }


  getNews(){
    this.newsService.getNewsByHeaderName(this.newsHeaderName, this.getDateNow()).subscribe(response => {
      this.spinner.show();
      if (response.status === 'ok') {
        this.news = response;
        this.dataService.data = response;
        this.dataService.extData = {keyword: this.newsHeaderName, date: this.getDateNow()};

        setTimeout(() => {
          this.spinner.hide(); 
          this.router.navigateByUrl('/news-list');
        }, 2000);
      } else {
        this.spinner.hide();
      }
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

}
