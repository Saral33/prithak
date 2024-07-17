import { ITaskInterface } from '@/interfaces/task.interface';
import { client } from '@/settings/elasticSearchSettings';

class SearchRepository {
  public async save(task: ITaskInterface) {
    const { title, description, status, deadline, priority, userId, id } = task;
    const res = await client.index({
      index: `${userId}` + 'tasks',
      id,
      body: { title, description, status, deadline, priority, userId },
    });
    if (!res) {
      throw new Error('Failed to create task in elastic search');
    }
    return res;
  }
  public async delete(id: string, userId: string) {
    const res = await client.delete({
      index: `${userId}` + 'tasks',
      id,
    });
    if (!res) {
      throw new Error('Failed to delete task in elastic search');
    }
    return res;
  }

  public async search(query: string, id: string) {
    const res = await client.search({
      index: `${id}` + 'tasks',

      body: {
        query: {
          bool: {
            should: [
              {
                match_phrase_prefix: {
                  title: query,
                },
              },
              {
                match_phrase_prefix: {
                  description: query,
                },
              },
            ],
          },
        },
        // query: {
        //   query_string: {
        //     query: query + '*',
        //     fields: ['title', 'description'],
        //   },
        // },
      },
    });
    if (!res?.hits) throw new Error('Failed to search task in elastic search');
    return res?.hits.hits;
  }
}

export const SearchRepositoryInstance = new SearchRepository();
