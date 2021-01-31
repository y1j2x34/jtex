import { html } from '.';
import fs from 'fs';
import path from 'path';
import json from './debug/debug.karma-result.json';
import { JSONReportData } from '../../../common/jtex-karma-json-report-core';

const htmlStr = html({
    data: (json as unknown) as JSONReportData,
    collapsed: false,
    jumpToError: true,
    lang: 'zh-CN'
});

fs.writeFileSync(path.resolve(__dirname, '../temp/index.html'), htmlStr);
