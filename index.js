import { React, Reapp, List, Button, Cursor, router, store, actions } from 'reapp-kit';

store({
  post: { 1: { title: 'Hello World', content: 'Lorem Ipsum' } },
  posts: ['1']
});

actions('addPost', (title, content) => {
  const id = Math.random();
  store().withMutations(store => {
    store.setIn(['post', id], { title: 'Another', content: 'Lorem' });
    store.get('posts').push(id);
  })
});

const Article = Cursor(['posts', 'post'], ArticleComponent);
class ArticleComponent extends React.Component {
  render() {
    return (
      <List>
        {this.props.posts.map(id =>
          <ArticleItem post={this.props.post.get(id)} />
        )}
        <Button onTap={actions.addPost}>Add Post</Button>
      </List>
    );
  }
}

class ArticleItem {
  render() {
    return (
      <List.Item title={this.props.post.get('title')}>
        {this.props.post.get('content')}
      </List.Item>
    );
  }
}

router({ path: '/', handler: Reapp(Article) });