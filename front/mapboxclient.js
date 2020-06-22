
import MapboxClient from 'mapbox';

import config from './utils/config';

const client = new MapboxClient(config.get("pk.eyJ1IjoiYXN0YW5pb3MiLCJhIjoiY2tibG9uMDNiMGdndzJzdG1jbjdoMWd4ZSJ9._2MzapdZv0fOo8tZae6-ng"));
export default client;