import * as elements from 'typed-html';
import { ReportOptions } from './ReportOptions';
import fs from 'fs';

export function logoHtml(options: ReportOptions) {
    if (!options.logoFile) {
        return '';
    }
    console.info(options.logoFile);
    if (!fs.existsSync(options.logoFile)) {
        return (
            <i class="material-icons align-top" style="width:30px;height:30px;font-size:30px">
                broken_image
            </i>
        );
    }
    const extRegex = /\.(\w+)$/;
    const extExc = extRegex.exec(options.logoFile);
    const ext = extExc ? extExc[1] : '';
    switch (ext) {
        case 'jpeg':
        case 'jpg':
        case 'gif':
        case 'png':
        case 'ico': {
            const base64 = fs.readFileSync(options.logoFile).toString('base64');
            return (
                <img
                    src={'data:image/' + ext + ';base64,' + base64}
                    width="30"
                    height="30"
                    class="d-inline-block align-top"
                />
            );
        }
        case 'svg': {
            const base64 = fs.readFileSync(options.logoFile).toString('base64');
            return (
                <object
                    data={'data:image/svg+xml;base64,' + base64}
                    type="image/svg+xml"
                    style="width:30px;height:30px"
                    class="d-inline-block align-top"
                ></object>
            );
        }
    }
}
