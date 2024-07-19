// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new MultiTranslateHttpLoader(http, [
//     { prefix: './assets/translate/includes/header', suffix: '.json' },
//     { prefix: './assets/translate/home', suffix: '.json' }
//   ]);
// }

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     BrowserModule,
//     HttpClientModule,
//     TranslateModule.forRoot({
//       loader: {
//         provide: TranslateLoader,
//         useFactory: HttpLoaderFactory,
//         deps: [HttpClient] // Assicurati di usare HttpClient qui
//       }
//     })
//   ],
//   exports: [
//     HttpClientModule,
//     TranslateModule
//   ]
// })
// export class LangTranslateModule { }
