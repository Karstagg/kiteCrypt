#__ kiteCrypt __
kiteCrypt is an encrypted messaging system for secure communication. The project will use Angular2 for rendering frontend while utilizing PHP7 for backend. The project will use pusher to sync messages. The data in the database will have zero knowledge as all messages would be encrypted using Elliptic Curve Cryptography with 256 bit encryption. All messages in database will only be stored encrypted which will provide zero knowledge as any access to database will only provide ciphertext  with only the client able to decrypt. Decryption occurs only on the clients machine using javascript while the data always remain encrypted on the server.

## Current Status of Project
The application is capable of logging in a new user, signing-in current users, encrypting text, and text decrypting. The application is currently lacking trigger to push encrypted text to  pusher. It's also missing the ability of having encryption and decryption auto run without a click event. The user is not able to create a friendship in order to communicate with other users, with administrators creating relationships in the backend. The app is able to hash passwords and salt passwords to improve security of the site.

## Future Plans for Project
Due to the present, limited functionality, there are several things we plan to add. First, we want to retrieve messages from other user’s via Pusher. Second, we want add the ability for the user to friend and unfriend. Friending would be done using an invitation process with a secret passphrase the inviter must give to the invitee in order for them to become a friend. (Note that communication the passphrase would be done outside of kiteCrypt to preserve users' zero knowledge of other users unless they were explicitly invited.) Third, we want to create more pleasing user interaction and experience (UI/UX) by using a more conventional chat interface. Finally, we may potentially drop Angular2 for a more lightweight JavaScript framework. Our experience up to this point indicates that Angular2 is not optimal for our application.

## How to Use Current kitecrypt.com website
In order to log-in to website, go to (https://kitecrypt.com/). In username field, type "user", and type "user" again in password field to access chat section of app.

### Team Members
Matt Fisher <br/> Juin "Jon" Sheafe <br/> Grant Wells <br/>Jonathan Guzman <br/>