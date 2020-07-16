import React from "react";

class ChangePassword extends React.Component {
	render() {
		return (
			<div className="m-2">
				<button
					type="button"
					className="btn btn-primary"
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
export default ChangePassword;
