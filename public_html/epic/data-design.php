<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<div class="img">
			<link rel="stylesheet" href="../epic/css/css-epic.css" type="text/css" />
		</div>
	</head>
	<body>
		<main>
			<h1>kiteCrypt Data Design</h1>
			<!-- data design -->
			<section>
				<h2>Entities and Attributes</h2>
				<h4>Profile *STRONG*</h4>
				<details>
					<summary></summary>
					<ul>
						<li>profileId (PRIMARY_KEY AUTO_INCREMENT)</li>
						<li>userName (UNIQUE)</li>
						<li>key (UNIQUE)</li>
					</ul>
				</details>
				<h4>Friends *WEAK*</h4>
				<details>
					<summary></summary>
					<ul>
						<li>friendsProfileId (FOREIGN_KEY)</li>
						<li>friendsFriendId (FOREIGN_KEY)</li>
					</ul>
				</details>
				<h4>Invite *WEAK*</h4>
				<details>
					<summary></summary>
					<ul>
						<li>inviteId (FOREIGN_KEY)</li>
						<li>invitedId (FOREIGN_KEY)</li>
						<li>dateTime</li>
						<li>passPhrase</li>
					</ul>
				</details>
				<h4>Message *WEAK*</h4>
				<details>
					<summary></summary>
					<ul>
						<li>messageId (PRIMARY_KEY AUTO_INCREMENT)</li>
						<li>senderId (FOREIGN_KEY)</li>
						<li>receiverId (FOREIGN_KEY)</li>
						<li>dateString</li>
						<li>text</li>
					</ul>
				</details>
			</section>
			<!-- ERD -->
			<section>
				<img src="img/kiteCryptERD.svg" alt="kiteCrypt ERD" width="80%" height="auto">
			</section>
		</main>
	</body>
</html>