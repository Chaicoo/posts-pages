import "./Home.css";
import { Component } from "react";
import { loadPosts } from "../../utils/loadPosts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 9,
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });

    return posts;
  };

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className="container">
        <Posts posts={posts} />
        <div className="buttonContainer">
          <Button
            onClick={this.loadMorePosts}
            text="Load more posts"
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}

export default Home;
