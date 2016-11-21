<!doctype html>

<html lang="en-us">
	<head>
		<meta charset="utf-8">

		<link rel="stylesheet/less" type="text/css" href="lib/twitter-bootstrap/lib/bootstrap.less">
		<script src="lib/less/less-1.1.5.min.js"></script>

		<link href="styles.css" rel="stylesheet" />
		<link href="pusher-chat-widget.css" rel="stylesheet" />


		<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<script src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
		<script src="https://js.pusher.com/3.0/pusher.min.js"></script>
		<script src="js/PusherChatWidget.js"></script>
		<script>
			$(function() {
				var pusher = new Pusher("ba8a764bb7f9047185e4")
				var chatWidget = new PusherChatWidget(pusher, {
					appendTo: "#pusher_chat_widget"
				});
			});
		</script>

	</head>
	<body>

		<section class="realtime-chat">
			<div class="container-fluid col-lg-4 col-offset-8">
			</div>
			<div class="span5" id="pusher_chat_widget">
			</div>

		</section>

	</body>
</html>
