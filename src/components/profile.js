import React from "react";
import Spinner from "./spinner";

class Profile extends React.Component {
	state = {
		user: null,
		userArticles: null
	};

	componentDidMount() {
		const { handle } = this.props.match.params;
		console.log(handle, 'V2 Checking handle of logged in user: WORKING');
		const user = `https://conduit.productionready.io/api/profiles/${handle}`;
		const userArticles = `https://conduit.productionready.io/api/articles?author=${handle}&limit=5&offset=0`;
		console.log(this, "V2 After Fetch Assign: GETTING USER");;

		const userP = fetch(user).then((res) => res.json());
		const userArticlesP = fetch(userArticles).then((res) => res.json());

		Promise.all([userP, userArticlesP]).then((res) => {
			console.log(res[0].profile, "V2 Res Profile");
			console.log(res[1].articles, "V2 Res Articles");
			console.log(this, "This inside Promise All");
			this.setState({ user: res[0].profile, userArticles: res[1].articles });
		});
		console.log(this, "This After Promise");
	}

	render() {
		console.log(this, "Inside render");
		return this.state.user ? (
			<>
				<section class="hero is-dark has-text-centered">
					<div class="hero-body">
						<div class="container">
							<div className="image-container">
								<img
									className="profile-user-image"
									src={this.state.user.image || "https://static.productionready.io/images/smiley-cyrus.jpg"}
								/>
							</div>
							<h1 class="title">{this.state.user.username}</h1>
							<h2 class="subtitle">{this.state.user.bio}</h2>
							<button class="margin-lr-10 button is-small is-primary is-outlined">
								My Articles
							</button>
							<button class="button is-small is-primary is-outlined">
								Favorites
							</button>
						</div>
					</div>
				</section>

				<section className="container flex space-around">
					{console.log(this.state.userArticles, "Inside Render 2")}
					{this.state.userArticles.map((article) => {
						return (
							<div class="box profile-card margin-10">
								<article class="media">
									<div class="media-left">
										<figure class="image is-64x64">
											<img
												src="https://bulma.io/images/placeholders/128x128.png"
												alt="Image"
											/>
										</figure>
									</div>
									<div class="media-content">
										<div class="content">
											<p>
												<strong>{article.title}</strong> <br /><small className='is-size-7'>@johnsmith</small>{" "}
												<small>{article.createdAt.slice(0, 10)}</small>
												</p>
												<br />
												<p>
											{article.description}
											</p>
										</div>
										<nav class="level is-mobile">
											<div class="level-left">
												<a class="level-item" aria-label="reply">
													<span class="icon is-small">
														<i class="fas fa-reply" aria-hidden="true"></i>
													</span>
												</a>
												<a class="level-item" aria-label="retweet">
													<span class="icon is-small">
														<i class="fas fa-retweet" aria-hidden="true"></i>
													</span>
												</a>
												<a class="level-item" aria-label="like">
													<span class="icon is-small">
														<i class="fas fa-heart" aria-hidden="true"></i>
													</span>
												</a>
											</div>
										</nav>
									</div>
								</article>
							</div>
						);
					})}
				</section>
			</>
		) : (
			<Spinner />
		);
	}
}

export default Profile;
