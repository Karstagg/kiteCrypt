<h1>KiteCrypt</h1>
<form class="form-horizontal" id="chatForm" name="chatForm" #chatForm="ngForm" (ngSubmit)="sendText();" novalidate>
	<h2>Welcome to your secure chat</h2>
	<hr />

	<div class="form-group" [ngClass]="{ 'has-error': messageReceiverId.touched && messageReceiverId.invalid }">
		<label for="messageReceiverId">Message Receiver Id</label>
		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-user-plus" aria-hidden="true"></i>
			</div>
<!--			<input type="number" name="messageReceiverId" id="messageReceiverId" class="form-control" min="1" required [(ngModel)]="message.messageReceiverId" #messageReceiverId="ngModel" />-->
		<select name="messageReceiverId" id="messageReceiverId" class="form-control" required [(ngModel)]="message.messageReceiverId" #messageReceiverId="ngModel">
			<option value="" selected>Select a friend to message</option>
			<option *ngFor="let key of keys" [value] = "key.profileId">{{key.profileUserName}}</option>
		</select>
		</div>
		<div [hidden]="messageReceiverId.valid || messageReceiverId.pristine" class="alert alert-danger" role="alert">
			<p *ngIf="messageReceiverId.errors?.required">Message receiver id is required.</p>
			<p *ngIf="messageReceiverId.errors?.min">Message receiver id must be positive.</p>
		</div>
	</div>
	<div class="form-group" [ngClass]="{ 'has-error': messageText.touched && messageText.invalid }">
		<label for="messageText">Message Text</label>
		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-envelope" aria-hidden="true"></i>
			</div>
			<input type="text" name="messageText" id="messageText" class="form-control" maxlength="255" required [(ngModel)]="message.messageText" #messageText="ngModel" />
		</div>
		<div [hidden]="messageText.valid || messageText.pristine" class="alert alert-danger" role="alert">
			<p *ngIf="messageText.errors?.required">Message text is required.</p>
			<p *ngIf="messageText.errors?.maxlength">Message text is too long.</p>
		</div>
	</div>
	<button type="submit" class="btn btn-info btn-lg" [disabled]="chatForm.invalid"><i class="fa fa-paper-plane"></i> Send Message</button>
	<button type="reset" class="btn btn-warning btn-lg"><i class="fa fa-ban"></i> Cancel</button>
</form>
<div *ngIf="status !== null" class="alert alert-dismissible" [ngClass]="status.type" role="alert">
	<button type="button" class="close" aria-label="Close" (click)="status = null;"><span aria-hidden="true">&times;</span></button>
	{{ status.message }}
</div>

<div (newMessage)="receiveText()"></div>

<pre (click)="receiveText()">{{message | json}}</pre>
<subscription [search]="channel" [pusher]="pusher"></subscription>