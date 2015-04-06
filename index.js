import {
  React, Reapp, List, Button, Swiper,
  Immutable, router, store, action, theme
} from 'reapp-kit';

theme(require('reapp-kit/themes/ios'));

store({
  post: { 1: { id: 1, title: 'Hello World', content: 'Lorem Ipsum' } },
  posts: ['1']
});

action('addPost', (title, content) => {
  const id = Math.random();
  store().withMutations(store => {
    store.setIn(['post', id], Immutable.fromJS({ id, title: 'Another', content: 'Lorem' }));
    store.set('posts', store.get('posts').push(id));
  });
});

action('deletePost', id => {
  store().withMutations(store => {
    store.set('post', store.get('post').delete(id));
    const posts = store.get('posts');
    store.set('posts', posts.delete(posts.indexOf(id)));
  });
})

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

class ArticleItem extends React.Component {
  render() {
    return (
      <Swiper right below={
        <Button chromeless color="red" styles={styles.button}
          onTap={() => this.action.deletePost(this.props.post.get('id'))}>
          Delete
        </Button>
      }>
        <List.Item title={this.props.post.get('title')}>
          {this.props.post.get('content')}
        </List.Item>
      </Swiper>
    );
  }
}

const styles = {
  button: {
    self: { width: 90, height: 67 }
  }
};

router({ name: 'home', path: '/', handler: Reapp(Article) });