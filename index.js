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

const storeCursor = store();

actions('addPost', (title, content) => {
  const id = Math.random();
  storeCursor().withMutations(store => {
    store.setIn(['post', id], Immutable.fromJS({ title: 'Another', content: 'Lorem' }));
    store.set('posts', store.get('posts').push(''+id));
  })
});

const Article = Reapp(class extends React.Component {
  render() {
    return (
      <List>
        {this.context.store().get('posts').map(id => {
          const post = this.context.store().getIn(['post', id]);
          console.log('post', post, post.toJS())
          return <ArticleItem post={post} />;
        })}
        <Button fullscreen onTap={this.context.actions.addPost}>
          Add Post
        </Button>
      </List>
    );
  }
})

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
  route('articles', '/', { handler: Article })
);