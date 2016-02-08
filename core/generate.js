import 'babel-core/register';
import 'babel-polyfill';

import {readFileSync, writeFileSync} from 'fs';
import {safeLoad} from 'js-yaml';
import {render} from 'mustache';
import moment from 'moment';

const config = safeLoad(readFileSync('dory.yml', 'utf8'));
const catalogue = JSON.parse(readFileSync(config.catalogue, 'utf8'));
const templates = {
    index: readFileSync(config.templates.index, 'utf8'),
    post: readFileSync(config.templates.post, 'utf8'),
    list: readFileSync(config.templates.list, 'utf8')
};

const posts = catalogue.map(post => {

    const createdDate = moment(post.createdDate).format(config.post.dateFormat);
    const view = render(templates.post, { createdDate });

    writeFileSync(`core/build/${post.slug}.html`, view);

});


//
//console.log(config.templates);


