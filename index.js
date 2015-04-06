import { React, Reapp, List, Button, Immutable, router, store, action, theme } from 'reapp-kit';
theme(require('reapp-kit/themes/ios'));

store({
  post: { 1: { title: 'Hello World', content: 'Lorem Ipsum' } },
  posts: ['1']
});

action('addPost', (title, content) => {
  const id = Math.random();
  store().withMutations(store => {
    store.setIn(['post', id], Immutable.fromJS({ title: 'Another', content: 'Lorem' }));
    store.set('posts', store.get('posts').push(id));
  });
});

// higher order component to pass cursor down
const Article = store.cursor(['posts', 'post'], class extends React.Component {
  render() {
    return (
      <List>
        {this.props.posts.map(id =>
          <ArticleItem post={this.props.post.get(id)} />
        )}
        <Button onTap={this.action.addPost}>Add Post</Button>
      </List>
    );
  }
})

class ArticleItem {
  render() {
    return (
      <List.Item title={this.props.post.get('title')}>
        {this.props.post.get('content')}
      </List.Item>
    );
  }
}

router({ name: 'home', path: '/', handler: Reapp(Article) });