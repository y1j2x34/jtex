import * as elements from 'typed-html';
import { ReportOptions } from './ReportOptions';
import code from './res/script.txt';

export function scripts(options: ReportOptions) {
    return [
        <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"
        ></script>,
        <script
            src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js"
            integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U"
            crossorigin="anonymous"
        ></script>,
        <script
            src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js"
            integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9"
            crossorigin="anonymous"
        ></script>,
        <script>{`$(document).ready(function() { $('body').bootstrapMaterialDesign(); });`}</script>,
        <script>var karmaResults = {JSON.stringify(options.data.browsers)};</script>,
        <script>{code}</script>
    ].join('');
}
