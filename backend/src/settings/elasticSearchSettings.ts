import { Client, errors } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://elasticsearch:9200',
});

function startElasticSearch() {
  client
    .ping()
    .then(() => {
      console.log('Elasticsearch is up!');
    })
    .catch((err: errors.ConnectionError) => {
      console.log('Elasticsearch unavailable', { error: err });
    });
}

export { startElasticSearch, client };
