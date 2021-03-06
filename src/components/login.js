import React from "react";
import { withRouter } from "react-router-dom";

const Login = (props) => {
	let email = React.useRef(null);
	let password = React.useRef(null);
	console.log("Email", email);

	function handleLogin(e) {
		e.preventDefault();
		fetch("https://conduit.productionready.io/api/users/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				user: {
					email: email.current.value,
					password: password.current.value
				}
			})
		})
			.then((res) => res.json())
			.then((userInfo) => {
				if (userInfo.errors) {
					localStorage.setItem("isLoggedIn", false);
					// localStorage.setItem("user", );

				} else {
					console.log(userInfo, 'userInfo');
					localStorage.setItem("isLoggedIn", true);
					props.updateIsLoggedIn(true);
					props.history.push("/");
					localStorage.setItem('conduit-token', userInfo.user.token)
					console.log(userInfo);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<div className="container width-50">
				<h2 className="title margin-10 text-center">Login</h2>
				<form>
					<input
						class="input is-primary margin-10"
						type="email"
						placeholder="Email"
						ref={email}
					/>

					<input
						class="input is-primary margin-10"
						type="password"
						placeholder="Password"
						ref={password}
					/>

					<button
						class="button is-success margin-10"
						onClick={(e) => {
							handleLogin(e);
						}}
					>
						Log In
					</button>
				</form>
			</div>
		</>
	);
};

export default withRouter(Login);
