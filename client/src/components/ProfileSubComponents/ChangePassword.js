import React from "react";
import { updateUser } from "../../actions/auth";
import { connect } from "react-redux";

class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: "",
			confirmNewPassword: "",
			newPassword: ""
		};
	}
	handleInputChange(field, event) {
		this.setState({
			[field]: event.target.value
		});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.dispatch(updateUser(this.state, this.props.userId));
	};
	render() {
		return (
			<div className="m-2">
				<button
					type="button"
					className="btn btn-danger"
					data-toggle="modal"
					data-target="#changePassword"
				>
					Change Password
				</button>
				{/* MODAL START //////////////////////////////////////////////////////////////////// */}
				<div
					className="modal fade"
					id="changePassword"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="changePasswordLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5
									className="modal-title"
									id="changePasswordLabel"
								>
									Update Password
								</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="old-password">
											Old Password
										</label>
										<input
											type="password"
											className="form-control"
											id="old-password"
											value={this.state.oldPassword}
											onChange={(event) => {
												this.handleInputChange(
													"oldPassword",
													event
												);
											}}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="new-password">
											New Password
										</label>
										<input
											type="password"
											className="form-control"
											id="new-password"
											value={this.state.newPassword}
											onChange={(event) => {
												this.handleInputChange(
													"newPassword",
													event
												);
											}}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="confirm-new-password">
											Confirm New Password
										</label>
										<input
											type="password"
											className="form-control"
											id="confirm-new-password"
											value={
												this.state.confirmNewPassword
											}
											onChange={(event) => {
												this.handleInputChange(
													"confirmNewPassword",
													event
												);
											}}
										/>
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										data-dismiss="modal"
									>
										Close
									</button>
									<button
										type="submit"
										className="btn btn-primary"
										onClick={this.handleSubmit}
									>
										Save changes
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				{/* MODAL END ////////////////////////////////////////////////////////////////////// */}
			</div>
		);
	}
}
export default connect()(ChangePassword);
