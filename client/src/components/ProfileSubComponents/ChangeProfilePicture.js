import React from "react";
import { connect } from "react-redux";
import { uploadAvatar } from "../../actions/auth";

class ChangeProfilePicture extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: ""
		};
	}
	send = (event) => {
		event.preventDefault();
		const data = new FormData();
		data.append("_id", this.props.userId);
		data.append("file", this.state.file);
		data.append("avatar", this.props.avatar);
		this.props.dispatch(uploadAvatar(data));
	};
	handleChange = (event) => {
		this.setState({
			file: event.target.files[0]
		});
	};
	render() {
		return (
			<div className="m-2">
				{/* BUTTON TO TRIGGER MODAL */}
				<button
					type="button"
					className="btn btn-success"
					data-toggle="modal"
					data-target="#change-profile-picture"
				>
					Change Profile Picture
				</button>

				{/* MODAL START /////////////////////////////////////////////////////////////////////////////////// */}
				<div
					className="modal fade"
					id="change-profile-picture"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="change-profile-pictureLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5
									className="modal-title"
									id="change-profile-pictureLabel"
								>
									Update Profile Picture
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
										<label htmlFor="file" className="mb-3">
											Choose a new Image
										</label>
										<input
											type="file"
											name="avatar"
											className="form-control-file"
											id="file"
											onChange={this.handleChange}
											accept=".jpg"
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
										type="button"
										className="btn btn-primary"
										onClick={this.send}
									>
										Save changes
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				{/* MODAL END ////////////////////////////////////////////////////////////////////////////////////// */}
			</div>
		);
	}
}

export default connect()(ChangeProfilePicture);
