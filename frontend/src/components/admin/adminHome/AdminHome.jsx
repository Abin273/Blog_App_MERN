import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminHome.css";
import { toastMessage } from "../../../utils/toastMessage";

function AdminHome() {
	const [usersData, setUsersData] = useState([]);
	const [filteredUsersData, setfilteredUsersData] = useState([]);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get("/api/admin/allUsers", {
					withCredentials: true,
				});
				if(data){
					setUsersData(data.users);
					setfilteredUsersData(data.users);
				}
			} catch (error) {
				toastMessage("failed to fetch users list", 'error')
			}

		})();
	}, []);

	const handleSearch = (e) => {
		setSearchText(e.target.value);

		const data = usersData.filter((user) => {
			return user.userName.includes(searchText);
		});
		setfilteredUsersData(data);
	};

	const handleBlockUnblock = (id) => {
		(async () => {
			const updatedUser = await axios.put(
				`/api/admin/handleBlock/${id}`,
				{
					withCredentials: true,
				}
			);
			toastMessage(updatedUser.data.users.isBlocked
				? "User has blocked"
				: "User has unBlocked", 'success')
			
			let users = usersData.map((user) => {
				if (user._id === id) {
					return {
						...user,
						isBlocked: updatedUser.data.users.isBlocked,
					};
				}
				return user;
			});

			setUsersData(users);
			setfilteredUsersData(users);
		})();
	};

	return (
		<div className="home-container">
			<h1>Users</h1>
			<div className="search-container">
				<input
					type="text"
					className="search-box"
					placeholder="Search by name . . ."
					onChange={handleSearch}
				/>
			</div>

			<div className="table-container">
				<table className="user-table">
					<thead>
						<tr>
							<th>id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Blocked or Unblocked</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsersData &&
							filteredUsersData.map(
								(
									{ _id, userName, email, isBlocked },
									index
								) => (
									<tr key={_id}>
										<td>{index + 1}</td>
										<td>{userName}</td>
										<td>{email}</td>
										<td>
											{isBlocked ? (
												<button
													className={`${isBlocked}`}
													onClick={() =>
														handleBlockUnblock(_id)
													}
												>
													Unblock
												</button>
											) : (
												<button
													className={`${isBlocked}`}
													onClick={() =>
														handleBlockUnblock(_id)
													}
												>
													Block
												</button>
											)}
										</td>
									</tr>
								)
							)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default AdminHome;
