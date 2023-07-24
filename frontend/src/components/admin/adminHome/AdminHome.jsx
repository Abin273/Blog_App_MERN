import React from "react";
import "./AdminHome.css";

function AdminHome() {
	return (
		<div className="home-container">
			<h1>Users</h1>
			<div class="search-container">
				<input
					type="text"
					class="search-box"
					placeholder="Search by name . . ."
				/>
			</div>

			<div className="table-container">
				<table class="user-table">
					<thead>
						<tr>
							<th>id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Blocked or Unblocked</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>John Doe</td>
							<td>john@example.com</td>
							<td>30</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Jane Smith</td>
							<td>jane@example.com</td>
							<td>28</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default AdminHome;
