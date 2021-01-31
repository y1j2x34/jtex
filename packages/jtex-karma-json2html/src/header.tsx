import * as elements from 'typed-html';
import { translater } from './utils/i18n';
import { ReportOptions } from './ReportOptions';
import style from './res/style.css';

export function generateHeader(options: ReportOptions) {
    const t = translater(options);
    return (
        <head>
            <meta charset="utf-8"></meta>
            <title>{t('page-title')}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
            ></link>
            <link
                rel="stylesheet"
                href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"
                integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX"
                crossorigin="anonymous"
            ></link>
            <style>{style}</style>
        </head>
    );
}
