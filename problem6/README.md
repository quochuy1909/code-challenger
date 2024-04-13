SCORED BOARD:

1. Top 10 user's scores:
   - This feature focus on the score board to query top 10.
   - Data Points:
     - Username: Username of the player.
     - Gmail: Gmail of the player.
     - Avatar: Avatar of the player.
     - Score: Score of the player and sort by asc or desc.
   - API:
     - Headers: Access Token.
     - Method: GET.
     - Query: Pagination(Page size, Page Index), Sort(Sort field, sort order)
     - Response: List user(Username, gmail, avatar, score).
2. Live update the score board:
   - Live update the score board with websocket.
   - Setup websocket for application.
   - Listen event from client and update database, then emit the event to refresh board score.
3. Update user's score when win the boss:
   - Listen event finished the play from client.
   - Update user's score into database and emit the event to refresh board score.
4. Update user's score when user finished the play:
   - Listen the request from client and update user's score into database .
   - API:
     - Headers: Access Token.
     - Method: POST.
     - Body:
       i. UserId.
       ii. GameId.
       iii. New Score.
     - Response:
       i. UserId.
       ii. GameId.
       iii. New Score.
5. All requirements need the access token.
