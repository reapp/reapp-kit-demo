import { React, Reapp, Immutable, List, Button, router, route, theme, store, actions } from 'reapp-kit';
import iOSTheme from 'reapp-kit/themes/ios';

theme({
  constants: [iOSTheme.constants.base, iOSTheme.constants.components],
  styles: [iOSTheme.styles],
  animations: [iOSTheme.animations],
});

store({
  post: { 1: { title: 'Hello World', content: 'Lorem Ipsum' } },
  posts: ['1']
});

actions('addPost', (title, content) => {
  store().withMutations(store => {
    const id = Math.random();
    store.setIn(['post', id], Immutable.fromJS({ title: 'Another', content: 'Lorem' }));
    store.set('posts', store.get('posts').push(id));
  })
});

class Article extends React.Component {
  render() {
    return (
      <List>
        {this.store().get('posts').map(id =>
          <ArticleItem
            post={this.store().getIn(['post', id])}
          />
        )}
        <Button fullscreen onTap={this.actions.addPost}>
          Add Post
        </Button>
      </List>
    );
  }
}

class ArticleItem extends React.Component {
  render() {
    return (
      <List.Item title={this.props.post.get('title')}>
        {this.props.post.get('content')}
      </List.Item>
    );
  }
}

router(
  route('articles', '/', { handler: Reapp(Article) })
);